import { writeBatch, doc } from "firebase/firestore";
import { db } from '../db.js';

export default async function seedTeams() {
  const teams = [
    ["Egypt","egy","Cairo","Egypt", "afr", "eastern", 0, 0],
    ["Nigeria","nig","Lagos","Ethiopia", "afr", "eastern", 0, 0],
    ["Kenya","ken","Nairobi","Kenya", "afr", "eastern", 0, 0],
    ["Morocco","mor","Casablanca","Morocco", "afr", "eastern", 0, 0],
    ["South Africa","saf","Cape Town","South Africa", "afr", "eastern", 0, 0],
    ["China","chi","Shanghai","China", "asi", "eastern", 0, 0],
    ["India","ind","New Delhi","India", "asi", "eastern", 0, 0],
    ["Japan","jap","Tokyo","Japan", "asi", "eastern", 0, 0],
    ["Russia","rus","Moscow","Russia", "asi", "eastern", 0, 0],
    ["United Arab Emirates","uae","Dubai","United Arab Emirates", "asi", "eastern", 0, 0],
    ["Australia","aus","Sydney","Australia", "oce", "eastern", 0, 0],
    ["Melanesia","mel","Suva","Fiji", "oce", "eastern", 0, 0],
    ["New Zealand","nze","Queenstown","New Zealand", "oce", "eastern", 0, 0],
    ["Micronesia","mic","Hagatna","Guam", "oce", "eastern", 0, 0],
    ["Polynesia","pol","Apia","Samoa", "oce", "eastern", 0, 0],
    ["Northern Europe","neu","Oslo","Norway", "eur", "western", 0, 0],
    ["Eastern Europe","eeu","Prague","Czech Republic", "eur", "western", 0, 0],
    ["Italy","ita","Rome","Italy", "eur", "western", 0, 0],
    ["Spain","spa","Barcelona","Spain", "eur", "western", 0, 0],
    ["United Kingdom","ukg","London","England", "eur", "western", 0, 0],
    ["Canada","can","Vancouver","Canada", "nam", "western", 0, 0],
    ["Caribbean","car","Havana","Cuba", "nam", "western", 0, 0],
    ["Central America","cam","San José","Costa Rica", "nam", "western", 0, 0],
    ["Mexico","mex","Mexico City","Mexico", "nam", "western", 0, 0],
    ["United States","usa","Chicago, Illinois","United States", "nam", "western", 0, 0],
    ["Argentina","arg","Buenos Aires","Argentina", "sam", "western", 0, 0],
    ["Brazil","bra","Rio de Janeiro","Brazil", "sam", "western", 0, 0],
    ["Colombia","col","Bogota","Colombia", "sam", "western", 0, 0],
    ["Peru","per","Lima","Peru", "sam", "western", 0, 0],
    ["Venezuela","ven","Caracas","Venezuela", "sam", "western", 0, 0]
  ]

// Get a new write batch
const batch = writeBatch(db);

teams.forEach(team => {
  const teamRef = doc(db, "teams", team[1]);
  batch.set(teamRef, {
    name: team[0],
    city: team[2],
    country: team[3],
    leagues: [1],
    division: team[4],
    conference: team[5],
    wins: 0,
    losses: 0,
    gamesPlayed: 0,
    runs: 0,
    hits: 0,
    errors: 0,
    pct: 0.000,
    streak: [],
    lastFive: [],
    home: {
      wins: 0,
      losses: 0,
      pct: 0.000,
      runs: 0,
      hits: 0,
      errors: 0,
    },
    away: {
      wins: 0,
      losses: 0,
      pct: 0.000,
      hits: 0,
      runs: 0,
      errors: 0
    }
  });

  const leagueRef = doc(db, "leagues", "1");
  batch.update(leagueRef, {
      [`standings.${team[1]}`]: {
      id: team[1],
      name: team[0],
      division: team[4],
      conference: team[5],
      wins: 0,
      losses: 0,
      gamesPlayed: 0,
      runs: 0,
      hits: 0,
      errors: 0,
      pct: 0.000,
      streak: ['', ''],
      lastFive: [],
      runsAgainst: 0,
      hitsAgainst: 0,
      home: {
        wins: 0,
        losses: 0,
        pct: 0.000,
        runs: 0,
        hits: 0,
        errors: 0,
        gamesPlayed: 0,
        runsAgainst: 0,
        hitsAgainst: 0,
      },
      away: {
        wins: 0,
        losses: 0,
        pct: 0.000,
        hits: 0,
        runs: 0,
        errors: 0,
        gamesPlayed: 0,
        runsAgainst: 0,
        hitsAgainst: 0
      }
    }
  })
  batch.update(leagueRef, {[`standings.lastUpdate`]: 0})
})


// Commit the batch
await batch.commit();

console.log("BATCH COMMITTED");

}