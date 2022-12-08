import Standings from "../standings/Standings";
import Team from "./Team";

export default function Dashboard(props) {

    console.log(props);
    return (
        <div className='Dashboard teamDashboard'>
            <div className='recentGames'>Recent Games</div>
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