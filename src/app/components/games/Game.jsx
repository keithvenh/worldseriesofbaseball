
export default function Game(props) {

    const game = props.options.game;
    console.log(game);

    return (
        <div key={game.id} className='gameSummary'>
            <div className='headers'>
                <p className='gameNumber'>GAME {game.id}</p>
                <p className='runs'>R</p>
                <p className='hits'>H</p>
                <p className='err'>E</p>
            </div>
            <div className={`${game.winTeam == game.visitor} visitor`}>
                <p className='team visTeam'>{game.visitor.toUpperCase()}</p>
                <p className='runs visRuns'>{game.visRuns}</p>
                <p className='hits visHits'>{game.visHits}</p>
                <p className='err visErrors'>{game.visErrors}</p>
            </div>
            <div className={`${game.winTeam == game.home} home`}>
                <p className='team homeTeam'>{game.home.toUpperCase()}</p>
                <p className='runs homeRuns'>{game.homeRuns}</p>
                <p className='hits homeHits'>{game.homeHits}</p>
                <p className='err homeErrors'>{game.homeErrors}</p>
            </div>
        </div>
    )
}