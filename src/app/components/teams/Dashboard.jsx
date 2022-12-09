import Standings from "../standings/Standings";
import Team from "./Team";
import UpcomingGames from '../games/UpcomingGames';
import RecentGames from '../games/RecentGames';

export default function Dashboard(props) {

    console.log(props);
    return (
        <div className='Dashboard teamDashboard'>
            <div className='gamesBar'>
                <UpcomingGames teams={props.team.division.id} count={3} appView={props.appView} />
                <RecentGames teams={props.team.division.id} count={6} appView={props.appView}/>
            </div>
            <div className='teamInfo'>
                <div className='teamStats'>Team Stats</div>
                <div className='teamStandings'>
                    <Standings
                        title={props.team.division.name}
                        divisions={props.team.division.id}
                        appView={props.appView}
                        team={props.team}
                    />
                </div>
                <div className='teamLeaders'>Team Leaders</div>
            </div>
        </div>
    )
}