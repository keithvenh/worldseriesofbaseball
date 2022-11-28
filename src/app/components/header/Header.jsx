import logout from '../../helpers/auth/logout';

export default function Header (props) {

    function logoutUser() {
        logout();
        props.appView('login');
    }

    if(!props.user) {
        return (
            <header className='header'>
                <h1 className='title' onClick={() => props.appView('login')}>World Series of Baseball</h1>
                <nav className='navBar'>
                    <ul className='links'>
                        <li className='linkItem' onClick={() => props.appView('signup')}>Sign Up</li>
                        <li className='linkItem' onClick={() => props.appView('login')}>Login</li>
                    </ul>
                </nav>
            </header>
        )
    }

    return (
        <header className='header'>
            <h1 className='title' onClick={() => props.appView('dashboard')}>World Series of Baseball</h1>
            <nav className='navBar'>
                <ul className='links'>
                    <li className='linkItem' onClick={() => props.appView('home')}>Home</li>
                    <li className='linkItem' onClick={() => props.appView('fielding')}>Fielding</li>
                    <li className='linkItem' onClick={() => props.appView('account')}>My Account</li>
                    <li className='linkItem' onClick={logoutUser}>Logout</li>
                </ul>
            </nav>
        </header>
    )
}