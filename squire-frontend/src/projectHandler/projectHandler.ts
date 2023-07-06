import { db } from "../firebase/base";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { ProjectType } from "../types/projectTypes";

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

export const getProjectDetails = async (
  projectId: string
): Promise<ProjectType> => {
  try {
    const docRef = doc(db, "projects", projectId);
    const response = await getDoc(docRef);
    return response.data() as ProjectType;
  } catch (e) {
    throw new Error("Unable to get project at this time!");
  }
};
