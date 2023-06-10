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

// import axios from "axios";
import { defineString } from "firebase-functions/params";

// Define some parameters
const OPEN_AI_KEY = defineString("OPEN_AI_KEY");

exports.onChunkCreated = functions.firestore
  .document("/chunks/{chunk}")
  .onCreate(async (snap, context) => {
    const { docs } = snap.data();
    const jobs: Promise<any>[] = [];
    for (let doc of docs) {
      const job = new Promise(async () => {
        return await createEmbedding(doc);
      });
      jobs.push(job);
    }
    return await Promise.all(
      docs.map(async (doc: string) => {
        fetch("https://api.openai.com/v1/embeddings", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPEN_AI_KEY.value()}`,
          },
          method: "POST",
          body: JSON.stringify({
            input: doc,
            model: "text-embedding-ada-002",
          }),
        }).then(async (response) => {
          const { data } = await response.json();
          const embedding = data[0].embedding;
          return embedding;
        });
      })
    )
      .then((results) => {
        console.log(results.length);
        return true;
      })
      .catch((error) => console.error(error));
  });

const createEmbedding = async (doc: string) => {
  try {
    const response = await fetch("https://api.openai.com/v1/embeddings", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPEN_AI_KEY.value()}`,
      },
      method: "POST",
      body: JSON.stringify({
        input: doc,
        model: "text-embedding-ada-002",
      }),
    });

    const { data } = await response.json();
    const embedding = data[0].embedding;
    return embedding;
  } catch (e) {
    console.log("there is an error");
    throw new Error(e as string);
  }
};
// const createEmbedding = async (
//   document: string,
//   token: string
// ): Promise<any> => {
//   try {
//     console.log(document);
//     const response = await axios.post(
//       "https://api.openai.com/v1/embeddings",
//       { input: document, model: "text-embedding-ada-002" },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     // console.log("response:", response);
//     return response.data;
//   } catch (e) {
//     console.log("there is an error");
//     throw new Error(e as string);
//   }
// };
