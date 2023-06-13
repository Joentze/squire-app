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

export interface SupabaseEmbeddingType {
  embedding: number[];
  data: object;
  project_id: string;
  build_id: string;
  timestamp: Date;
}
