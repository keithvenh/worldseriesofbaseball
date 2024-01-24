import seedGames from '../../db/seedGames';

export default function Admin() {
  return (
    <button onClick={seedGames}>Seed Games</button>
  )
}