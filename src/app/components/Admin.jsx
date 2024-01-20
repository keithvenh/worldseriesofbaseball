import seedTeams from '../../db/seedTeams';

export default function Admin() {
  return (
    <button onClick={seedTeams}>Seed Teams</button>
  )
}