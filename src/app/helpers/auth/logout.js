import { signOut, getAuth } from "firebase/auth";

export default function logout() {
  const auth = getAuth();
  signOut(auth);
};