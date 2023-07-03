import { db } from "../firebase/base";
import { addDoc, collection } from "firebase/firestore";

export const createProject = async (
  name: string,
  description: string,
  uid: string
): Promise<string> => {
  try {
    const docRef = collection(db, "projects");
    const newProject = await addDoc(docRef, {
      name,
      description,
      createdOn: new Date(),
      createdBy: uid,
    });
    return newProject.id;
  } catch (e) {
    throw new Error("Unable to create new project at this time!");
  }
};
