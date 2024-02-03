import { Link } from 'react-router-dom';

export default function TeamCard({team}) {

  const teamImage = require(`../../assets/images/${team.id}.webp`);

  return (
    <Link to={`/teams/${team.id}`} className='teamCard'>
      <div className='teamImage'>
        <img src={teamImage} alt={`${team.country} flag`}/>

      </div>
      <div className='teamName'>
        <hr/>
        <h3>{team.name}</h3>
        <hr/>
      </div>
      <p className='record'>({team.wins || 0} - {team.losses || 0})</p>
      <p className='location'>{team.city}</p>
      <p className='teamCountry'>{team.country}</p>
      <p className='conference'>{team.conference_name}</p>
      <p className='division'>{team.division_name}</p>
    </Link>
  )
}