export default function PlayerDetails(props) {
    const player = props.player

    if(props.starter && player) {
      return (
        <div className="PlayerDetails starter">
          <p className="lineupSpot">{player.lineupSpot}</p>
          <p className="name">{player.nameDisplayRoster}</p>
          <p className='position'>{player.position}</p>
          <p className='range'>1</p>
          <p className='error'>5</p>
        </div>
      );
    }

    return (
      <div className="PlayerDetails sub">
        <p className="lineupSpot">SUB</p>
        <p className="name"></p>
        <p className='position'></p>
        <p className='range'></p>
        <p className='error'></p>
      </div>
    );
}