import { getAuth } from 'firebase/auth';
import logout from '../../helpers/auth/logout';

export default function User(props) {

    const auth = getAuth();

    return (
        <div className='User'>
            <p>User page for {auth.currentUser.email}</p>
            <p>{auth.currentUser.uid}</p>
            <button onClick={() => {
                logout();
                props.updateView('home');
                }}>Logout</button>
        </div>
    )
}