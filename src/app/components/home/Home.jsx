import { getAuth, onAuthStateChanged } from 'firebase/auth';
import RecentGames from '../games/RecentGames';
import Standings from '../standings/Standings';
import Loading from '../Loading';
import UpcomingGames from '../games/UpcomingGames';

export default function Home(props) {

    return (
      <div className='Home'>
        <div className='gamesBar'>
          <UpcomingGames teams='all' count={4} appView={props.appView} />
          <RecentGames teams='all' count={5} appView={props.appView}/>
        </div>
        <div className='Standings'>
          <div className='conferenceStandings'>
            <Standings 
              appView={props.appView}
              divisions={'west'}
              title={"Western Conference"}
            />   
            <div className='divisionalStandings'>
              <Standings 
                appView={props.appView}
                divisions={'nam'}
                title={"North America"}
              />
              <Standings 
                appView={props.appView}
                divisions={'oce'}
                title={"Oceania"}
              />
              <Standings 
                appView={props.appView}
                divisions={'sam'}
                title={"South America"}
              />
            </div>
          </div>

          <div className='conferenceStandings'>
            <div className='divisionalStandings'>
              <Standings 
                appView={props.appView}
                divisions={'afr'}
                title={"Africa"}
              />
              <Standings 
                appView={props.appView}
                divisions={'asi'}
                title={"Asia"}
              />
              <Standings 
                appView={props.appView}
                divisions={'eur'}
                title={"Europe"}
              />
            </div>
            <Standings 
              appView={props.appView}
              divisions={'east'}
              title={"Eastern Conference"}
            />
          </div>
        </div>
      </div>
    )
}