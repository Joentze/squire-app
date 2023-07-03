import { Timestamp } from "firebase/firestore";

export interface ProjectType {
  name: string;
  description: string;
  createdOn: Date | Timestamp;
  createdBy: string;
}
export interface ProjectDisplayType extends ProjectType {
  id: string;
}
