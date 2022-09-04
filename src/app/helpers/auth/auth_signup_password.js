import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../db/db';

export default function createUser(email, password) {

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setDoc(doc(db, 'users', user.uid), {
          firstName: '',
          lastName: '',
          email: user.email,
          username: '',
          completeProfile: false
        }).catch((e) => {console.log(e)})
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
}