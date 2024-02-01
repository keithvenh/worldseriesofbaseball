import { useState, useEffect } from 'react';
import { getDocs } from 'firebase/firestore';

import {seasonsRef, conferencesRef, divisionsRef, teamsRef, leaguesRef} from '../../../../db/db';

export default function NewSeason() {
  const [stage, setStage] = useState(1);
  const [seasons, setSeasons] = useState();
  const [leagues, setLeagues] = useState();
  const [conferences, setConferences] = useState();
  const [divisions, setDivisions] = useState();
  const [teams, setTeams] = useState();
  const [newSeason, setNewSeason] = useState({
    id: '',
    year: '',
    name: '',
    current: false,
    teams: [],
    conferences: [],
    divisions: [],
    standings: {},
    league: ''
  })
  const [newConference, setNewConference] = useState({
    id: '',
    name: '',
    division: []
  })

  function changeStage(num) {
    setStage(prev => prev + num)
  }

  function handleInput(event) {
    let newValue = event.target.value;
    let id = newSeason.id;
    if(event.target.name == 'current') {
      newValue = !newSeason.current;
    }
    if(event.target.name == 'year') {
      id = newSeason.league + event.target.value;
    }
    setNewSeason(prev => ({
      ...prev,
      [event.target.name]: newValue,
      id: id
    }))
  }

  function updateLeague(event) {
    console.log("UPDATE LEAGUE");
    setNewSeason(prev => ({
      ...prev,
      league: event.target.name,
      id: event.target.name + prev.year
    }))
  } 

  function validateId(id) {
    const matchedSeasons = seasons.filter(s => s.id === id);
    if(matchedSeasons.length !== 0) {
      return false
    }
    if(id.length < 4) {
      return false
    } 
    return true
  }

  function validateYear(year) {
    if(year < 1900 || year > 3000) {
      return false;
    }
    return true
  }

  function handleNewConferenceInput(event) {
    console.log(event);
  }

  useEffect(() => {
    getDocs(seasonsRef).then(seasons => {
      let seasonsArray = [];
      seasons.docs.forEach(season => seasonsArray.push(season.data()))
      setSeasons(seasonsArray);
    });
    getDocs(conferencesRef).then(conferences => {
      let conferencesArray = [];
      conferences.docs.forEach(conference => conferencesArray.push(conference.data()))
      setConferences(conferencesArray);
    });
    getDocs(divisionsRef).then(divisions => {
      let divisionsArray = [];
      divisions.docs.forEach(division => divisionsArray.push(division.data()))
      setDivisions(divisionsArray);
    });
    getDocs(teamsRef).then(teams => {
      let teamsArray = [];
      teams.docs.forEach(team => teamsArray.push(team.data()))
      setTeams(teamsArray);
    });
    getDocs(leaguesRef).then(leagues => {
      let leaguesArray = [];
      leagues.docs.forEach(league => leaguesArray.push(league.data()))
      setLeagues(leaguesArray);
    });
  }, [])

  if(seasons && conferences && divisions && teams) {
    // ===== STAGE 1 - BASIC INFORMATION ===== //
    if(stage == 1) {
      return (
        <div className='newSeason'>

          <h1 className='adminPageTitle'>Create New Season</h1>
      
          <div className='adminFormField'>
            <p className='adminInputLabel'>ID</p>
            <input className='adminInput'
              name='id'
              disabled
              value={newSeason.id}
            />
            <p className='adminInputValidator'>
              {validateId(newSeason.id) ?
                <i className='valid'>&#10003;</i> :
                <i className='invalid'>&#10006;</i>}
            </p>
          </div>

          <div className='adminFormField'>
            <p className='adminInputLabel'>Year</p>
            <input className='adminInput'
              name='year'
              type='number'
              value={newSeason.year}
              onChange={handleInput}
              autoFocus
            />
            <p className='adminInputValidator'>
              {validateYear(newSeason.year) ?
              <i className='valid'>&#10003;</i> :
              <i className='invalid'>&#10006;</i>}
            </p>
          </div>

          <div className='adminFormField'>
            <p className='adminInputLabel'>Name</p>
            <input className='adminInput'
              name='name'
              value={newSeason.name}
              onChange={handleInput}
            />
          </div>

          <div className='adminFormField'>
              {leagues.map(league => (
                <>
                  <input className='adminCheckbox'
                    name={league.id}
                    type='checkbox'
                    checked={newSeason.league == league.id}
                    onChange={updateLeague}
                  />
                  <label htmlFor={league.id}>{league.name}</label>
                </>
              ))}
          </div>

          <div className='adminFormField'>

              <input className='adminCheckbox'
                name='current'
                type='checkbox'
                checked={newSeason.current}
                onChange={handleInput}
              />
              <label htmlFor='current'>Current Season</label>
          </div>
      
      
          <div className='adminFormControls'>
            <button className='next' onClick={() => changeStage(1)}>
              Continue &#10140;
            </button>
          </div>
          
        </div>
      )
    }
    return (
      <div className='newSeason'>
  
  
        <fieldset className='newSeasonConferences'>
          <legend>Select Conferences</legend>
          {conferences.map(conference => (
            <>
              <input className='adminCheckbox'
                name={conference.id}
                id={conference.id}
                type='checkbox'
                checked={newSeason.conferences.includes(conference.id)}
              />
              <label htmlFor={conference.id}>{conference.name}</label>
            </>
          ))}
        </fieldset>

        <div className='createNewConference'>
          <h2>Create a Conference</h2>

          <input className='adminInput'
            name='newConferenceId'
            value={newConference.id}
            onChange={handleNewConferenceInput}
            disabled
          />

          <input className='adminInput'
            name='newConferenceName'
            value={newConference.name}
            onChange={handleNewConferenceInput}
          />

          <fieldset className='newSeasonDivisions'> 
            <legend>Select Divisions</legend>
            {divisions.map(division => (
              <>
                <input className='adminCheckbox'
                  name={division.id}
                  id={division.id}
                  type='checkbox'
                  checked={newSeason.divisions.includes(division.id)}
                />
                <label htmlFor={division.id}>{division.name}</label>
              </>
            ))}
          </fieldset>
        </div>

        <fieldset className='newSeasonDivisions'>
          <legend>Select Divisions</legend>
          {divisions.map(division => (
            <>
              <input className='adminCheckbox'
                name={division.id}
                id={division.id}
                type='checkbox'
                checked={newSeason.divisions.includes(division.id)}
              />
              <label htmlFor={division.id}>{division.name}</label>
            </>
          ))}
        </fieldset>

        <fieldset className='newSeasonTeams'>
          <legend>Select Teams</legend>
          {teams.map(team => (
            <>
              <input className='adminCheckbox'
                name={team.id}
                id={team.id}
                type='checkbox'
                checked={newSeason.teams.includes(team.id)}
              />
              <label htmlFor={team.id}>{team.name}</label>
            </>
          ))}
        </fieldset>
  
      </div>
    )
  }

}