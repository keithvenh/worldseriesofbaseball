import { getAuth, onAuthStateChanged } from 'firebase/auth';
import RecentGames from './RecentGames';
import Standings from './Standings';

export default function Home(props) {
    const auth = getAuth();

    // show loading page for 4 seconds
    onAuthStateChanged(auth, (user) => {
          // go to HQ if user exists
        if(user) {
          // go to login if user does not exist
        } else {
          props.updateView('login');
        }
    });

    return (
      <div className='Home'>
        <RecentGames />
        <Standings />
        <p >Welcome to the home page of the app</p>
      </div>
    )
}