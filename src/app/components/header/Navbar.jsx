import { NavLink } from 'react-router-dom';

export default function Navbar (props) {

    return (
        <nav className='navbar' style={props.style}>
            <NavLink to="/games">Scores</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/players">Players</NavLink>
            <NavLink to="/leaders">League Leaders</NavLink>
            <NavLink to='/stats'>Stats</NavLink>
        </nav>
    )
}