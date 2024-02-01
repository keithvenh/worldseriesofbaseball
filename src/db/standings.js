import { firestoreDB } from './db';
import { collection, query, getDocs, orderBy, updateDoc, doc, where, limit, writeBatch } from 'firebase/firestore';

export async function getStandings(type='all', id='') {


  const leaguesRef = collection(firestoreDB, 'leagues')
  const q = query(leaguesRef, where('current', '==', true), limit(1))

  let leagueSnapshot = await getDocs(q)

  let currentLeague = leagueSnapshot.docs[0].data();

  if(currentLeague.standings.lastUpdate < currentLeague.gamesPlayed) {
     await updateStandings(currentLeague);
     leagueSnapshot = await getDocs(q);
     currentLeague = leagueSnapshot.docs[0].data()
  }

  return currentLeague;

}

export async function updateStandings(league) {
  // ===== GET COMPLETED GAMES ===== //
  const gamesRef = collection(firestoreDB, 'leagues/1/games');
  const q = query(gamesRef, 
    where('id', '>', league.standings.lastUpdate), 
    where('final', '==', true), 
    orderBy('id'));
  const gameSnapshot = await getDocs(q);
  
  const gameData = gameSnapshot.docs.map(doc => doc.data());
  
  gameData.forEach(game => {
    // ===== UPDATE HOME TEAM ===== //
    let homeStats = league.standings[game.home.team];

    let homeWin = game.winner == game.home.team ? 1 : 0;
    let homeLoss = game.loser == game.home.team ? 1 : 0;

    homeStats = {
      ...homeStats,
      wins: homeStats.wins + homeWin,
      losses: homeStats.losses + homeLoss,
      gamesPlayed: homeStats.gamesPlayed + 1,
      runs: homeStats.runs + game.home.runs,
      hits: homeStats.hits + game.home.hits,
      errors: homeStats.errors + game.home.errors,
      runsAgainst: homeStats.runsAgainst + game.visitor.runs,
      hitsAgainst: homeStats.hitsAgainst + game.visitor.hits,
      home: {
        ...homeStats.home,
        wins: homeStats.home.wins + homeWin,
        losses: homeStats.home.losses + homeLoss,
        gamesPlayed: homeStats.home.gamesPlayed +1,
        runs: homeStats.home.runs + game.home.runs,
        hits: homeStats.home.hits + game.home.hits,
        errors: homeStats.home.errors + game.home.errors,
        runsAgainst: homeStats.runsAgainst + game.visitor.runs,
        hitsAgainst: homeStats.hitsAgainst + game.visitor.hits,
      }
    }
    // Update Home Win % //
    let pct = (homeStats.wins / homeStats.gamesPlayed)
    homeStats.pct = pct;
    pct = (homeStats.home.wins / homeStats.home.gamesPlayed)
    homeStats.home.pct = pct

    // Update Home Last 5 //
    let lastFive = homeStats.lastFive;
    lastFive.push(homeWin);
    lastFive.length < 6 || lastFive.shift();
    homeStats.lastFive = lastFive;

    // Update Home Streak //
    let streak = homeStats.streak;
    if(homeWin == 1) {
      if(streak[0] == "w") {
        streak[1] += 1;
      } else {
        streak = ['w', 1];
      }
    } else {
      if(streak[0] == 'l') {
        streak[1] += 1;
      } else {
        streak = ['l', 1];
      }
    }
    homeStats.streak = streak;

    // ===== UPDATE VIS TEAM ===== //
    let visStats = league.standings[game.visitor.team];
    visStats = {
      ...visStats,
      // Home Loss = Vis Win
      wins: visStats.wins + homeLoss,
      // Home Win = Vis Loss
      losses: visStats.losses + homeWin,
      gamesPlayed: visStats.gamesPlayed + 1,
      runs: visStats.runs + game.visitor.runs,
      hits: visStats.hits + game.visitor.hits,
      errors: visStats.errors + game.visitor.errors,
      runsAgainst: visStats.runsAgainst + game.home.runs,
      hitsAgainst: visStats.hitsAgainst + game.home.hits,
      away: {
        ...visStats.away,
        wins: visStats.away.wins + homeLoss,
        losses: visStats.losses + homeLoss,
        gamesPlayed: visStats.away.gamesPlayed + 1,
        runs: visStats.away.runs + game.visitor.runs,
        hits: visStats.away.hits + game.visitor.hits,
        errors: visStats.away.errors + game.visitor.errors,
        runsAgainst: visStats.runsAgainst + game.home.runs,
        hitsAgainst: visStats.hitsAgainst + game.home.hits,
      }
    }

    // Update Vis Win % //
    pct = (visStats.wins / visStats.gamesPlayed)
    visStats.pct = pct;
    pct = (visStats.away.wins / visStats.away.gamesPlayed)
    visStats.away.pct = pct

    // Update Home Last 5 //
    lastFive = visStats.lastFive;
    lastFive.push(homeLoss);
    lastFive.length < 6 || lastFive.shift()
    visStats.lastFive = lastFive;

    // Update Home Streak //
    streak = visStats.streak;
    if(homeLoss == 1) {
      if(streak[0] == "w") {
        streak[1] += 1;
      } else {
        streak = ['w', 1];
      }
    } else {
      if(streak[0] == 'l') {
        streak[1] += 1;
      } else {
        streak = ['l', 1];
      }
    }
    visStats.streak = streak;
    
    league.standings[game.home.team] = homeStats;
    league.standings[game.visitor.team] = visStats;
    league.standings.lastUpdate = game.id
    
  })
  
  const leagueRef = doc(firestoreDB, 'leagues', league.id);
  await updateDoc(leagueRef, league);
}