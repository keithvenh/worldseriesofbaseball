
export default function Dashboard(props) {

    return (
        <div className='Dashboard'>
            <p className='username'>{props.user.profile.username}</p>
        </div>
    )
}