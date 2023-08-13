/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
import * as functions from "firebase-functions";
import { FieldValue } from "firebase-admin/firestore";
import admin = require("firebase-admin");
// import axios from "axios";
import { defineString } from "firebase-functions/params";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  FirestoreChunkDoc,
  SupabaseEmbeddingType,
} from "../types/firestoreTypes";
//initialise app
admin.initializeApp(functions.config().firebase);
// Define some parameters
const OPEN_AI_KEY = defineString("OPEN_AI_KEY");
const SUPABASE_URL = defineString("SUPABASE_URL");
const SUPABASE_PWD = defineString("SUPABASE_PWD");
const SQUIRE_API_URL = defineString("SQUIRE_API_URL");

enum ChatStatus {
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
  PROCESSING = "PROCESSING",
}

exports.onChatCreated = functions.firestore
  .document("/chats/{chat}")
  .onCreate(async (snap, context) => {
    const { projectId, buildId, query } = snap.data();
    const { id } = snap.ref;
    await admin
      .firestore()
      .collection("chats")
      .doc(id)
      .update({ status: ChatStatus.PROCESSING });
    return await new Promise(async () => {
      const response = await fetch(
        `${SQUIRE_API_URL.value()}/api?build_id=${buildId}&project_id=${projectId}&query=${query}&number_of_matches=3`,
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
      const contexts = await response.json();
      let allContext: string[] = [];
      for (let context of contexts) {
        let indivCol = context["data"];
        let currCol: string[] = [];
        for (const [dataType, colData] of Object.entries(indivCol)) {
          currCol.push(`${dataType}: ${colData}`);
        }
        let infoChunk: string = currCol.join("\n");
        // const thisContext = Object.values(context["data"] as object).join(" ");
        allContext.push(infoChunk);
      }
      const contextPayload = allContext.join("\n\n");
      console.log(contextPayload);
      const chatResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPEN_AI_KEY.value()}`,
          },
          method: "POST",
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              {
                role: "user",
                content: `You are a helpful assistant and you respond to the query based on the context below. If you do not know the answer, say you don't know
              
              context:
              ${contextPayload}

              query:
              ${query}

              response:`,
              },
            ],
          }),
        }
      );
      const gptResponse = await chatResponse.json();
      console.log(gptResponse);
      const completion = gptResponse["choices"][0]["message"]["content"];

      await admin
        .firestore()
        .collection("chats")
        .doc(id)
        .update({ response: completion, status: ChatStatus.COMPLETED });
    }).catch((e) => {
      admin
        .firestore()
        .collection("chats")
        .doc(id)
        .update({ status: ChatStatus.ERROR });
    });
  });

exports.onChunkCreated = functions.firestore
  .document("/chunks/{chunk}")
  .onCreate(async (snap, context) => {
    const supabaseClient = createClient(
      SUPABASE_URL.value(),
      SUPABASE_PWD.value()
    );
    const { docs, project_id, build_id } = snap.data();
    return await Promise.all(
      docs.map(async (chunk: FirestoreChunkDoc) => {
        const { document, metadata } = chunk;
        fetch("https://api.openai.com/v1/embeddings", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPEN_AI_KEY.value()}`,
          },
          method: "POST",
          body: JSON.stringify({
            input: document,
            model: "text-embedding-ada-002",
          }),
        }).then(async (response) => {
          const { data } = await response.json();
          const embedding = data[0].embedding;
          await writeEmbeddings(supabaseClient, {
            embedding,
            project_id,
            build_id,
            data: metadata,
            timestamp: new Date(),
          });
        });
      })
    ).then(async () => {
      const { id } = snap.ref;
      await admin
        .firestore()
        .collection("chunks")
        .doc(id)
        .update({ status: "SUCCESS" });
      await admin
        .firestore()
        .collection("builds")
        .doc(build_id)
        .update({
          completedChunks: FieldValue.arrayUnion(id),
        });
    });
  });

const writeEmbeddings = async (
  supabase: SupabaseClient,
  embeddings: SupabaseEmbeddingType
): Promise<boolean> => {
  const { error } = await supabase.from("document").insert(embeddings);
  return error ? false : true;
};
