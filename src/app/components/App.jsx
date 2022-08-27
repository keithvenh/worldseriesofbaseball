import React, {Component} from 'react';
import Scorecard from './scorecard/Scorecard';
import SuperAdvanced from './fielding/SuperAdvanced';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: <SuperAdvanced />
    }
  }

  render() {

    return (
      <div className="App">
          <h1 className='title'>World Series of Baseball</h1>
          {this.state.view}
      </div>
    );
  }
}

export default App;
