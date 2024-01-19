export default function NavLink(props) {
    
    const displayLink = props.link.replace(/([a-z])([A-Z])/g, '$1 $2');

    return (
        <li className={`navLink ${props.activeLink}`} onClick={() => props.handler(props.link, props.options)}>{displayLink}</li>
    )
}