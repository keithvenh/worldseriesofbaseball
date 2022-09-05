import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default async function createUser(email, password) {

    const auth = getAuth();

    const user = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        return userCredential.user;
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    
    return user;
}