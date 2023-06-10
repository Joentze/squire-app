export interface FirestoreChunk {
  docs: FirestoreChunkDoc[];
  buildId: string;
  status: "PROCESSING" | "ERROR" | "SUCCESS";
}

export interface FirestoreChunkDoc {
  document: string;
  metadata: object;
}
