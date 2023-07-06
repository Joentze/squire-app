import { Timestamp } from "firebase/firestore";

export interface BuildType {
  projectId: string;
  comments?: string;
  createdOn: Date | Timestamp;
}
