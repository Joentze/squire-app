export interface FirestoreChunk {
  createdOn: Date;
  docs: FirestoreChunkDoc[];
  project_id: string;
  build_id: string;
  status: "PROCESSING" | "ERROR" | "SUCCESS";
}

export interface FirestoreChunkDoc {
  document: string;
  metadata: object;
}

export const enum Chunk {
  SIZE = 50,
}
