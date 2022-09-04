import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Home(props) {
    const auth = getAuth();

    // show loading page for 4 seconds
    onAuthStateChanged(auth, (user) => {
        // go to HQ if user exists
        if(user) {
          props.updateView('home');
        // go to login if user does not exist
        } else {
          props.updateView('login');
        }
    });

    return (
        <p >Welcome to the home page of the app</p>
    )
}