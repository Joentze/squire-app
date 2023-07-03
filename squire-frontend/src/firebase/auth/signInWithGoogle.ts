import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../base";
import { checkUserExists, createUser, updateLastLogin } from "./userHandler";

const GoogleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<void> => {
  signInWithPopup(auth, GoogleProvider)
    .then(async (result) => {
      const user = result.user;
      const { displayName, email, photoURL, uid } = user;
      const isUserExists = await checkUserExists(uid);
      if (isUserExists) {
        await updateLastLogin(uid);
      } else {
        await createUser(uid, {
          createdOn: new Date(),
          lastLogin: new Date(),
          firstName: displayName as string,
          lastName: "",
          impressions: [],
          email: email as string,
          photoURL: photoURL as string,
        });
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
