import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/base";

export enum ChatStatus {
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
  PROCESSING = "PROCESSING",
}

export interface ChatType {
  createdBy: string;
  buildId: string;
  projectId: string;
  query: string;
  response?: string;
  status: ChatStatus;
}

export const writeChat = async (
  createdBy: string,
  projectId: string,
  buildId: string,
  query: string
): Promise<void> => {
  try {
    const docRef = collection(db, "chats");
    await addDoc(docRef, {
      createdBy,
      projectId,
      buildId,
      query,
      status: ChatStatus.PROCESSING,
    });
  } catch (e) {
    throw new Error(
      "There was an error with sending chat message at this moment!"
    );
  }
};
