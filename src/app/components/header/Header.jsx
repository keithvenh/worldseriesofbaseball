
export default function Header (props) {

    return (
        <header className='header'>
            <h1 className='title' onClick={() => props.appView('dashboard')}>World Series of Baseball</h1>
            <nav className='navBar'>
                <ul className='links'>
                    <li className='linkItem' onClick={() => props.appView('home')}>Home</li>
                    <li className='linkItem' onClick={() => props.appView('games')}>Games</li>
                    <li className='linkItem' onClick={() => props.appView('teams')}>Teams</li>
                    <li className='linkItem' onClick={() => props.appView('fielding')}>Fielding</li>
                </ul>
            </nav>
        </header>
    )
}