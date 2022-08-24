import React, {Component} from 'react';
import rollDice from '../../helpers/rollDice';
import rangeCharts from '../../../db/rangeCharts.json';

class SuperAdvanced extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roll: '',
            result: '',
            position: 1,
            range: 1
        }

        this.getResults = this.getResults.bind(this);
        this.updateResults = this.updateResults.bind(this);
    }
    
    getResults = () => {

        let dice = rollDice('1d20', '3d6');
        this.setState({
            roll: dice[0].total,
            result: rangeCharts[this.state.position.toString()][this.state.range.toString()][dice[0].total.toString()]
        })

    }

    updateResults = (args) => {

        let position, range;
        args.position ? position = args.position : position = this.state.position;
        args.range ? range = args.range : range = this.state.range;
        this.setState({
            position: position,
            range: range,
            result: rangeCharts[position.toString()][range.toString()][this.state.roll.toString()]
        })
    }

    render() {

        return (
            <div className='SuperAdvanced'>
                <div className='positions'>
                    <p className={(this.state.position === 1).toString()} onClick={() => {this.updateResults({position: 1})}}>P</p>
                    <p className={(this.state.position === 2).toString()} onClick={() => {this.updateResults({position: 2})}}>C</p>
                    <p className={(this.state.position === 3).toString()} onClick={() => {this.updateResults({position: 3})}}>1B</p>
                    <p className={(this.state.position === 4).toString()} onClick={() => {this.updateResults({position: 4})}}>2B</p>
                    <p className={(this.state.position === 5).toString()} onClick={() => {this.updateResults({position: 5})}}>3B</p>
                    <p className={(this.state.position === 6).toString()} onClick={() => {this.updateResults({position: 6})}}>SS</p>
                    <p className={(this.state.position === 7).toString()} onClick={() => {this.updateResults({position: 7})}}>LF</p>
                    <p className={(this.state.position === 8).toString()} onClick={() => {this.updateResults({position: 8})}}>CF</p>
                    <p className={(this.state.position === 9).toString()} onClick={() => {this.updateResults({position: 9})}}>RF</p>
                </div>

                <div className='range'>
                    <p className={(this.state.range === 1).toString()} onClick={() => {this.updateResults({range: 1})}}>1</p>
                    <p className={(this.state.range === 2).toString()} onClick={() => {this.updateResults({range: 2})}}>2</p>
                    <p className={(this.state.range === 3).toString()} onClick={() => {this.updateResults({range: 3})}}>3</p>
                    <p className={(this.state.range === 4).toString()} onClick={() => {this.updateResults({range: 4})}}>4</p>
                    <p className={(this.state.range === 5).toString()} onClick={() => {this.updateResults({range: 5})}}>5</p>
                </div>
                <button onClick={this.getResults}>Roll Dice</button>
                <p>Roll: {this.state.roll}</p>
                <p>Results: {this.state.result}</p>
            </div>
        )
    }
}

export default SuperAdvanced;