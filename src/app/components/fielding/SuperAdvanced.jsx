import React, {Component} from 'react';
import rollDice from '../../helpers/rollDice';
import rangeCharts from '../../../db/rangeCharts.json';
import errorCharts from '../../../db/errorCharts.json';

class SuperAdvanced extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roll: [{results: [], total: ''}, {results: [], total: ''}],
            rangeResult: '',
            errorResult: {"E1": [], "E2": [], "E3": []},
            position: 1,
            range: 1,
            eRating: '',
        }

        this.getResults = this.getResults.bind(this);
        this.updateResults = this.updateResults.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    
    getResults = () => {

        let dice = rollDice('1d20', '3d6');
        let eone = [];
        let etwo = [];
        let ethree = [];
        dice[1].total === 5 ? eone = ["R"] : eone = errorCharts[this.state.position.toString()][dice[1].total.toString()]["E1"];
        dice[1].total === 5 ? etwo = ["R"] : etwo = errorCharts[this.state.position.toString()][dice[1].total.toString()]["E2"];
        if(this.state.position > 6) {
            dice[1].total === 5 ? ethree = ["R"] : ethree = errorCharts[this.state.position.toString()][dice[1].total.toString()]["E3"];
        }

        this.setState({
            roll: dice,
            rangeResult: rangeCharts[this.state.position.toString()][this.state.range.toString()][dice[0].total.toString()],
            errorResult: {"E1": eone, "E2": etwo, "E3": ethree}
        })

    }

    updateResults = (args) => {

        let position, range;
        args.position ? position = args.position : position = this.state.position;
        args.range ? range = args.range : range = this.state.range;
        let eone = [];
        let etwo = [];
        let ethree = [];
        this.state.roll[1].total === 5 ? eone = ["R"] : eone = errorCharts[position.toString()][this.state.roll[1].total.toString()]["E1"];
        this.state.roll[1].total === 5 ? etwo = ["R"] : etwo = errorCharts[position.toString()][this.state.roll[1].total.toString()]["E2"];
        if(position > 6) {
            this.state.roll[1].total === 5 ? ethree = ["R"] : ethree = errorCharts[position.toString()][this.state.roll[1].total.toString()]["E3"];
        }
        this.setState({
            position: position,
            range: range,
            rangeResult: rangeCharts[position.toString()][range.toString()][this.state.roll[0].total.toString()],
            errorResult: {"E1": eone, "E2": etwo, "E3": ethree}
        })
    }

    handleInput = (e) => {
        
        this.setState({
            eRating: e.target.value
        })
    }

    render() {

        console.log(this.state.errorResult["E1"].length)
        return (
            <div className='SuperAdvanced'>
                <div className='positions'>
                    <p className='label'>Position</p>
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
                    <p className='label'>Range</p>
                    <p className={(this.state.range === 1).toString()} onClick={() => {this.updateResults({range: 1})}}>1</p>
                    <p className={(this.state.range === 2).toString()} onClick={() => {this.updateResults({range: 2})}}>2</p>
                    <p className={(this.state.range === 3).toString()} onClick={() => {this.updateResults({range: 3})}}>3</p>
                    <p className={(this.state.range === 4).toString()} onClick={() => {this.updateResults({range: 4})}}>4</p>
                    <p className={(this.state.range === 5).toString()} onClick={() => {this.updateResults({range: 5})}}>5</p>
                </div>

                <div className='errorRating'>
                    <p className='label'>e Rating: </p>
                    <input className='eRating' value={this.state.eRating} onChange={(e) => {this.handleInput(e)}}/>
                </div>

                <div className='buttonContainer'>
                    <button className='rollButton' onClick={this.getResults}>Roll Dice</button>
                </div>

                <div className='results'>
                    {this.state.roll[0].total ? <p>{this.state.roll[0].total}</p> : ''}
                    {this.state.roll[1].total ? <p className='total'>{this.state.roll[1].total}</p> : ''}
                </div>
                {this.state.rangeResult ? <p className='rangeResult'>{this.state.rangeResult}</p> : ''}
                <div className='errors'>
                    {this.state.errorResult["E1"].length > 0 ? <p className='label'>E1</p> : ''}
                    <div className='errorList'>
                        {this.state.errorResult["E1"].map(e => <p key={e} className='error'>{e}</p>)}
                    </div>
                </div>
                <div className='errors'>
                    {this.state.errorResult["E2"].length > 0 ? <p className='label'>E2</p> : ''}
                    <div className='errorList'>
                        {this.state.errorResult["E2"].map(e => <p key={e} className='error'>{e}</p>)}
                    </div>
                </div>
                <div className='errors'>
                    {this.state.errorResult["E3"].length > 0 ? <p className='label'>E3</p> : ''}
                    <div className='errorList'>
                        {this.state.errorResult["E3"].map(e => <p key={e} className='error'>{e}</p>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default SuperAdvanced;