import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";

import auth from "@/lib/firebase";

export const signIn = async (
  email: string,
  password: string
): Promise<UserCredential> => signInWithEmailAndPassword(auth, email, password);

export const logout = async (): Promise<void> => {
  await signOut(auth);
};
