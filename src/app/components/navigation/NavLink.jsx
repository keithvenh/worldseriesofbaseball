export default function NavLink(props) {
    
    const displayLink = props.link.replace(/([a-z])([A-Z])/g, '$1 $2');

    return (
        <li className='navLink' onClick={() => props.handler(props.link)}>{displayLink}</li>
    )
}