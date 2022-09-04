import React, {Component} from 'react';
import Scorecard from './scorecard/Scorecard';
import SuperAdvanced from './fielding/SuperAdvanced';
import NewUser from './auth/NewUser';
import User from './auth/User';
import Home from './home/Home';
import { getAuth } from 'firebase/auth';
import Login from './auth/Login';
import logout from '../helpers/auth/logout';
import UpdateProfile from './auth/UpdateProfile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: <Home updateView={this.changeView} />
    }

    this.changeView = this.changeView.bind(this);
  }

  changeView = (page) => {
    let view;
    switch(page) {
      case 'home':
        view = <Home updateView={this.changeView} />;
        break;
      case 'fielding':
        view = <SuperAdvanced />;
        break;
      case 'scorecard':
        view = <Scorecard />;
        break;
      case 'signup':
        view = <NewUser updateUser={this.updateUser} updateView={this.changeView} />;
        break;
      case 'account':
        view = <User updateView={this.changeView}/>;
        break;
      case 'login':
        view = <Login />;
        break;
      case 'profileUpdate':
        view = <UpdateProfile updateView={this.changeView} />;
        break;
      default:
        view = <Home updateView={this.changeView} />;
    }

    this.setState({view: view})
  }  

  render() {

    return (
      <div className="App">
          <header className='header'>
            <h1 className='title' onClick={() => this.changeView('home')}>World Series of Baseball</h1>
            <nav className='navBar'>
              <ul className='links'>
                <li className='linkItem' onClick={() => this.changeView('home')}>Home</li>
                <li className='linkItem' onClick={() => this.changeView('fielding')}>Fielding</li>
                <li className='linkItem' onClick={() => this.changeView('scorecard')}>Scorecard</li>
                {getAuth().currentUser ? <li className='linkItem' onClick={() => this.changeView('account')}>My Account</li> : <li className='linkItem' onClick={() => this.changeView('signup')}>Sign Up</li>}
                {getAuth().currentUser ? <li className='linkItem' onClick={() => logout()}>Logout</li> : <li className='linkItem' onClick={() => this.changeView('login')}>Login</li>}
              </ul>
            </nav>
          </header>
          {this.state.view}
      </div>
    );
  }
}

export default App;
