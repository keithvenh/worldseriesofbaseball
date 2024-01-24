import RecentGames from '../games/RecentGames';
import UpcomingGames from '../games/UpcomingGames';

import Standings from '../standings/Standings';
import Loading from '../Loading';

export default function Home(props) {

    return (
      <div className='Home'>
        <div className='gamesBar'>
          <RecentGames />
          <UpcomingGames />
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