import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Header from './header/Header';
import Dashboard from './home/Dashboard';
import Home from './home/Home';
import User from './auth/User';
import Fielding from './fielding/SuperAdvanced';
import Games from './games/Games';
import Game from './games/Game';
import Teams from './teams/Teams';
import Team from './teams/show';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../db/db';
import Navbar from './navigation/Navbar';

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [view, setView] = useState();
  const [activeLink, setActiveLink] = useState();

  function appView(link, options = {subview: ''}) {

    const views = {
      dashboard: <Home appView={appView} />,
      home: <Home appView={appView} />,
      account: <User />,
      fielding: <Fielding />,
      games: <Games appView={appView} options={options} />,
      game: <Game appView={appView} options={options} />,
      teams: <Teams key={link} appView={appView} link={link} options={options} />,
      team: <Team appView={appView} options={options} />
    }

    let pageLink = link.split('/')[0]
    setView(views[pageLink]);
    setActiveLink(link);
  }

  if (initializing) {
    setTimeout(() => {
      setInitializing(false);
      appView('home');
    }, 2500);

    return (
      <div className='App'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='App'>
      <Navbar 
          title='World Series of Baseball'
          links={['dashboard', 'games', 'teams', 'fielding']}
          handler={appView}
          activeLink={activeLink}
      />
      {view}
    </div>
  );
}