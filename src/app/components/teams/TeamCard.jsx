import { Link } from 'react-router-dom';

export default function TeamCard({team}) {

  const teamImage = require(`../../assets/images/${team.id}.webp`);

  return (
    <Link to={`/teams/${team.id}`} className='teamCard'>
      <div className='teamImage'>
        <img src={teamImage} alt={`${team.country} flag`}/>

      </div>
      <h3 className='teamName'>
        <hr/>
        <h3>{team.name}</h3>
        <hr/>
      </h3>
      <p className='record'>({team.wins} - {team.losses})</p>
      <p className='location'>{team.city}, <span className='teamCountry'>{team.country}</span></p>
      <p className='conference'>{team.conference}</p>
      <p className='division'>{team.division}</p>
      {team.championships?.length > 0 ? <p>Champtions: {team.championships}</p> : ''}
    </Link>
  )
}