import { NavLink } from 'react-router-dom';

export default function Navbar (props) {

    return (
        <nav className='navbar' style={props.style}>
            <NavLink to="/games" activeClassName='active'>Scores</NavLink>
            <NavLink to="/teams" activeClassName='active'>Teams</NavLink>
            <NavLink to="/players" activeClassName='active'>Players</NavLink>
            <NavLink to="/leaders" activeClassName='active'>League Leaders</NavLink>
            <NavLink to='/stats' activeClassName='active'>Stats</NavLink>
        </nav>
    )
}