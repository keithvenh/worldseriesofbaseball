import { writeBatch, doc } from "firebase/firestore";
import { db } from './db.js';

export default async function seedTeams() {
  const teams = [
    ["Egypt","egy","Cairo","Egypt", "Africa Division", "Eastern Conferene", 0, 0],
    ["Nigeria","nig","Lagos","Ethiopia", "Africa Division", "Eastern Conference", 0, 0],
    ["Kenya","ken","Nairobi","Kenya", "Africa Division", "Eastern Conference", 0, 0],
    ["Morocco","mor","Casablanca","Morocco", "Africa Division", "Eastern Conference", 0, 0],
    ["South Africa","saf","Cape Town","South Africa", "Africa Division", "Eastern Conference", 0, 0],
    ["China","chi","Shanghai","China", "Asia Division", "Eastern Conference", 0, 0],
    ["India","ind","New Delhi","India", "Asia Division", "Eastern Conference", 0, 0],
    ["Japan","jap","Tokyo","Japan", "Asia Division", "Eastern Conference", 0, 0],
    ["Russia","rus","Moscow","Russia", "Asia Division", "Eastern Conference", 0, 0],
    ["United Arab Emirates","uae","Dubai","United Arab Emirates", "Asia Division", "Eastern Conference", 0, 0],
    ["Australia","aus","Sydney","Australia", "Oceania Division", "Eastern Conference", 0, 0],
    ["Melanesia","mel","Suva","Fiji", "Oceania Division", "Eastern Conference", 0, 0],
    ["New Zealand","nze","Queenstown","New Zealand", "Oceania Division", "Eastern Conference", 0, 0],
    ["Micronesia","mic","Hagatna","Guam", "Oceania Division", "Eastern Conference", 0, 0],
    ["Polynesia","pol","Apia","Samoa", "Oceania Division", "Eastern Conference", 0, 0],
    ["Northern Europe","neu","Oslo","Norway", "Europa Division", "Western Conference", 0, 0],
    ["Eastern Europe","eeu","Prague","Czech Republic", "Europa Division", "Western Conference", 0, 0],
    ["Italy","ita","Rome","Italy", "Europa Division", "Western Conference", 0, 0],
    ["Spain","spa","Barcelona","Spain", "Europa Division", "Western Conference", 0, 0],
    ["United Kingdom","ukg","London","England", "Europa Division", "Western Conference", 0, 0],
    ["Canada","can","Vancouver","Canada", "North America Division", "Western Conference", 0, 0],
    ["Caribbean","car","Havana","Cuba", "North America Division", "Western Conference", 0, 0],
    ["Central America","cam","San José","Costa Rica", "North America Division", "Western Conference", 0, 0],
    ["Mexico","mex","Mexico City","Mexico", "North America Division", "Western Conference", 0, 0],
    ["United States","usa","Chicago, Illinois","United States", "North America Division", "Western Conference", 0, 0],
    ["Argentina","arg","Buenos Aires","Argentina", "South America Division", "Western Conference", 0, 0],
    ["Brazil","bra","Rio de Janeiro","Brazil", "South America Division", "Western Conference", 0, 0],
    ["Colombia","col","Bogota","Colombia", "South America Division", "Western Conference", 0, 0],
    ["Peru","per","Lima","Peru", "South America Division", "Western Conference", 0, 0],
    ["Venezuela","ven","Caracas","Venezuela", "South America Division", "Western Conference", 0, 0]
  ]

// Get a new write batch
const batch = writeBatch(db);

teams.forEach(team => {
  const docRef = doc(db, "teams", team[1]);
  batch.set(docRef, {
    name: team[0],
    city: team[2],
    country: team[3],
    leagues: [1],
    division: team[4],
    conference: team[5],
    wins: 0,
    losses: 0
  })
})

// Commit the batch
await batch.commit();

console.log("BATCH COMMITTED");

}