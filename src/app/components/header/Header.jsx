import logout from '../../helpers/auth/logout';

export default function Header (props) {

    function logoutUser() {
        logout();
        props.changeView('login');
    }

    if(!props.user) {
        return (
            <header className='header'>
                <h1 className='title' onClick={() => props.changeView('login')}>World Series of Baseball</h1>
                <nav className='navBar'>
                    <ul className='links'>
                        <li className='linkItem' onClick={() => props.changeView('signup')}>Sign Up</li>
                        <li className='linkItem' onClick={() => props.changeView('login')}>Login</li>
                    </ul>
                </nav>
            </header>
        )
    }

    return (
        <header className='header'>
            <h1 className='title' onClick={() => props.changeView('dashboard')}>World Series of Baseball</h1>
            <nav className='navBar'>
                <ul className='links'>
                    <li className='linkItem' onClick={() => props.changeView('home')}>Home</li>
                    <li className='linkItem' onClick={() => props.changeView('fielding')}>Fielding</li>
                    <li className='linkItem' onClick={() => props.changeView('account')}>My Account</li>
                    <li className='linkItem' onClick={logoutUser}>Logout</li>
                </ul>
            </nav>
        </header>
    )
}