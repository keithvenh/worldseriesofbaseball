import NavLink from './NavLink';

export default function Navbar (props) {

    return (
        <nav className='navbar' style={props.style}>

            <h1 className='title'>{props.title}</h1>

            <ul className='navLinks'>

                {props.links.map(link => <NavLink key={link} link={link} handler={props.handler} />)}

            </ul>

        </nav>
    )
}