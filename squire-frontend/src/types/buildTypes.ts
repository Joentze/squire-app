import { Timestamp } from "firebase/firestore";

export interface BuildType {
  status: BuildStatus;
  projectId: string;
  comments?: string;
  chunkNo?: number;
  createdOn: Date | Timestamp;
}

export enum BuildStatus {
  COMPLETED = "COMPLETED",
  INCOMPLETE = "INCOMPLETE",
}
