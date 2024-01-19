import { Link } from 'react-router-dom';

import Navbar from './navigation/Navbar';

export default function Header (props) {

    return (
        <header className='header'>
            <Link to='/'>
                <h1 id='headerTitle' className='title'>World Series of Baseball</h1>
            </Link>

            <Navbar />
        </header>
    )
}