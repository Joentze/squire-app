export interface FirestoreChunk {
  docs: FirestoreChunkDoc[];
  projectId: string;
  buildId: string;
  status: "PROCESSING" | "ERROR" | "SUCCESS";
}

export interface FirestoreChunkDoc {
  document: string;
  metadata: object;
}

export const enum Chunk {
  SIZE = 50,
}
