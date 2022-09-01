import React, {Component} from 'react';
import Scorecard from './scorecard/Scorecard';
import SuperAdvanced from './fielding/SuperAdvanced';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: <SuperAdvanced />
    }

    this.changeView = this.changeView.bind(this);
  }

  changeView = (page) => {
    let view;
    switch(page) {
      case 'home':
        view = <p>WELCOME</p>;
        break;
      case 'fielding':
        view = <SuperAdvanced />;
        break;
      case 'scorecard':
        view = <Scorecard />
        break;
      default:
        view = <p>WELCOME</p>;
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
              </ul>
            </nav>
          </header>
          {this.state.view}
      </div>
    );
  }
}

export default App;
