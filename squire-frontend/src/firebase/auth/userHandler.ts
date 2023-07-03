import { db } from "../base";
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";

export interface User {
  createdOn: Date;
  email: string;
  impressions: string[];
  lastLogin: Date;
  firstName: string;
  lastName: string;
  photoURL: string;
}

export const checkUserExists = async (uid: string): Promise<boolean> => {
  const docRef = doc(db, "user", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return true;
  return false;
};

export const createUser = async (
  uid: string,
  userObject: User
): Promise<void> => {
  try {
    await setDoc(doc(db, "user", uid), userObject);
  } catch (e) {
    throw new Error("There was a problem creating new user.");
  }
};

export const updateLastLogin = async (uid: string): Promise<void> => {
  const docRef = doc(db, "user", uid);
  await updateDoc(docRef, { lastLogin: new Date() });
};
