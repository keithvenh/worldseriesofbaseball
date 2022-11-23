import React, { useState, useEffect } from 'react';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Header from './header/Header';
import Dashboard from './home/Dashboard';
import Home from './home/Home';
import User from './auth/User';
import Fielding from './fielding/SuperAdvanced';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../db/db';

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [view, setView] = useState(<Login changeView={changeView} />);
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

  function changeView(page) {
    switch(page) {
      case 'login':
        setView(<Login changeView={changeView} />);
        break;
      case 'signup':
        setView(<Signup changeView={changeView} />);
        break;
      case 'dashboard':
        setView(<Dashboard changeView={changeView} user={{user: user, profile: profile}}/>);
        break;
      case 'home':
        setView(<Home changeView={changeView} user={{user: user, profile: profile}}/>);
        break;
      case 'account':
        setView(<User />);
        break;
      case 'fielding':
        setView(<Fielding />);
        break;
      default:
        setView(<Login changeView={changeView} />);
    }
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
        <Header user={user} changeView={changeView} />
        {view}
      </div>
    );
  }

  return (
    <div className='App'>
      <Header user={user} changeView={changeView} />
      {view}
    </div>
  );
}