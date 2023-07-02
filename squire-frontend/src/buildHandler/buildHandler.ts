import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/base";
import {
  Chunk,
  FirestoreChunk,
  FirestoreChunkDoc,
} from "../types/documentTypes";

export const postChunk = async (
  chunk: FirestoreChunkDoc[],
  projectId: string,
  buildId: string
): Promise<void> => {
  try {
    const docRef = collection(db, "chunks");
    await addDoc(docRef, {
      docs: chunk,
      project_id: projectId,
      build_id: buildId,
      createdOn: new Date(),
      status: "PROCESSING",
    } as FirestoreChunk);
  } catch (e) {
    throw new Error("Problem with uploading chunk");
  }
};

export const splitDocChunks = (
  docs: FirestoreChunkDoc[]
): FirestoreChunkDoc[][] => {
  const chunks: FirestoreChunkDoc[][] = [];
  for (let i = 0; i < docs.length; i += Chunk.SIZE) {
    const chunk = docs.slice(i, i + Chunk.SIZE);
    chunks.push(chunk);
  }
  return chunks;
};

export const writeAllChunks = async (
  docs: FirestoreChunkDoc[],
  projectId: string,
  buildId: string
): Promise<void> => {
  try {
    const chunks: FirestoreChunkDoc[][] = splitDocChunks(docs);
    await Promise.all(
      chunks.map(async (chunk) => postChunk(chunk, projectId, buildId))
    );
  } catch (e) {
    throw new Error("There was an error with uploading chunks");
  }
};
