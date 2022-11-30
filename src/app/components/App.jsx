import React, { useState, useEffect } from 'react';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Header from './header/Header';
import Dashboard from './home/Dashboard';
import Home from './home/Home';
import User from './auth/User';
import Fielding from './fielding/SuperAdvanced';
import Games from './games/Games';
import Game from './games/Game';
import Teams from './teams/index';
import Team from './teams/show';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../db/db';

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [view, setView] = useState(<Login appView={appView} />);
  const [link, setLink] = useState('login');
  const auth = getAuth();

  // Handle user state changes
  async function onAuthStateChanged(user) {
    setUser(user);
    let profile;
    if(user) {
      profile = await getDoc(doc(db, 'users', user.uid))
    }
    setProfile(profile.data());
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function appView(link, options = {subview: ''}) {

    const views = {
      login: <Login appView={appView} />,
      signup: <Signup appView={appView} />,
      dashboard: <Dashboard appView={appView} user={{user: user, profile: profile}}/>,
      home: <Home appView={appView} user={{user: user, profile: profile}}/>,
      account: <User />,
      fielding: <Fielding />,
      games: <Games appView={appView} options={options} />,
      game: <Game appView={appView} options={options} />,
      teams: <Teams appView={appView} options={options} />,
      team: <Team appView={appView} options={options} />
    }

    if(link === 'users' && options.subview === 'show') {
      if(options && options.user.uid === options.requestor.uid) {
          // Return myAccount if current user requestor are the same
          return appView('auth')
        } 
    }

    setView(views[link]);
    setLink(link);
  }

  if (initializing) {
    return (
      <div className='App'>
        <iframe src="https://giphy.com/embed/3ohzdJKvFq7VYRhKhy" width="480" height="480" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='App'>
        <Header user={user} appView={appView} />
        {view}
      </div>
    );
  }

  return (
    <div className='App'>
      <Header user={user} appView={appView} />
      {view}
    </div>
  );
}