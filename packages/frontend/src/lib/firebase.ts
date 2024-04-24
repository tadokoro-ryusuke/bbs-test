import { FirebaseOptions, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const config: FirebaseOptions = {
  apiKey: "test-key",
  authDomain: "test-bbs.firebaseapp.com",
};

const app = initializeApp(config);
const auth = getAuth(app);

connectAuthEmulator(auth, "http://localhost:9099");

export default auth;
