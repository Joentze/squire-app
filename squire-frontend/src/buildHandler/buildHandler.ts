import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/base";
import { BuildType } from "../types/buildTypes";
import {
  Chunk,
  FirestoreChunk,
  FirestoreChunkDoc,
} from "../types/documentTypes";

export interface BuildDisplayType extends BuildType {
  id: string;
}

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

export const getBuildAllDetails = async (
  projectId: string
): Promise<BuildDisplayType[]> => {
  try {
    const collectionRef = collection(db, "builds");
    const q = query(collectionRef, where("projectId", "==", projectId));
    const snapshot = await getDocs(q);
    let builds: BuildDisplayType[] = [];
    snapshot.forEach((doc) =>
      builds.push({ id: doc.id, ...(doc.data() as BuildType) })
    );
    return builds;
  } catch (e) {
    console.error(e);
    throw new Error("Unable to get builds at this moment!");
  }
};

export const createNewBuild = async (
  projectId: string,
  createdBy: string
): Promise<string> => {
  try {
    const collectionRef = collection(db, "builds");
    const response = await addDoc(collectionRef, {
      projectId,
      createdBy,
      createdOn: new Date(),
    } as BuildType);
    return response.id;
  } catch (e) {
    throw new Error("Unable to get new build at this moment!");
  }
};
