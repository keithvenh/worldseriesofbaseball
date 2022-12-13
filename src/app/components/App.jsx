import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Navbar from './navigation/Navbar';
import Home from './home/Home';
import Games from './games/Games';
import Teams from './teams/Teams';
import Fielding from './fielding/SuperAdvanced';

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [view, setView] = useState();
  const [activeLink, setActiveLink] = useState();

  function appView(link, options={}) {

    const views = {
      dashboard: <Home appView={appView} />,
      fielding: <Fielding />,
      games: <Games key={link} appView={appView} link={link} options={options} />,
      teams: <Teams key={link} appView={appView} link={link} options={options} />
    }

    let pageLink = link.split('/')[0]
    setView(views[pageLink]);
    setActiveLink(link);
  }

  if (initializing) {
    setTimeout(() => {
      setInitializing(false);
      appView('dashboard');
    }, 5000);

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
          titleLink='dashboard'
          links={['dashboard', 'games', 'teams', 'fielding']}
          handler={appView}
          activeLink={activeLink.split('/')[0]}
          options={{}}
      />
      {view}
    </div>
  );
}