import React, {Component} from 'react';
import createUser from '../../helpers/auth/auth_signup_password';
import { db } from '../../../db/db';
import { doc, setDoc } from 'firebase/firestore';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fName: '',
            lName: '',
            email: '',
            username: '',
            favTeam: '',
            birthdate: '',
            pass: '',
            confirmPass: '',
            errors: ''
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {

        const value = e.target.value;

        switch(e.target.id) {
            case 'firstName':
                this.setState({fName: value});
                break;
            case 'lastName':
                this.setState({lName: value})
                break;
            case 'email':
                this.setState({email: value});
                break;
            case 'username':
                this.setState({username: value});
                break;
            case 'birthdate':
                this.setState({birthdate: value});
                break;
            case 'favTeam':
                this.setState({favTeam: value});
                break;
            case 'password':
                this.setState({pass: value});
                break;
            case 'confirmPassword':
                this.setState({confirmPass: value});
                break;
            default:
                console.log('Error ' + e.target.id + ' does not exist');

        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        if(this.state.pass === this.state.confirmPass) {

            const user = await createUser(this.state.email, this.state.pass);

            await setDoc(doc(db, 'users', user.uid), {
                                        firstName: this.state.fName,
                                        lastName: this.state.lName,
                                        username: this.state.username,
                                        birthdate: this.state.birthdate,
                                        favTeam: this.state.favTeam
                            }).catch((e) => {console.log(e)})
            this.props.updateView('dashboard');
        } else {
            this.setState({error: "Passwords Don't Match."})
        }
    }

    render() {

        return (
            <form className='Signup' onSubmit={this.handleSubmit}>
                <div className='formField'>
                    <p className='errors'>{this.state.errors}</p>
                </div>

                <div className='formField name'>
                    <div className='formField'>
                        <p className='label'>First Name</p>
                        <input type='text' onChange={this.handleInput} id='firstName' value={this.state.fName} />
                    </div>
                    <div className='formField'>
                        <p className='label'>Last Name</p>
                        <input type='text' onChange={this.handleInput} id='lastName' value={this.state.lName} />
                    </div>
                </div>

                <div className='formField'>
                    <p className='label'>Email</p>
                    <input type='email' onChange={this.handleInput} id='email' value={this.state.email}/>
                </div>

                <div className='formField'>
                    <p className='label'>Username</p>
                    <input type='username' onChange={this.handleInput} id='username' />
                </div>

                <div className='formField'>
                    <p className='label'>Birthdate</p>
                    <input type='date' onChange={this.handleInput} id='birthdate' value={this.state.birthdate} />
                </div>

                <div className='formField'>
                    <p className='label'>Favorite Team</p>
                    <select  id='favTeam' value={this.state.favTeam} onChange={this.handleInput}>
                        <optgroup label='Current MLB'>
                            <option value='Arizona Diamondbacks'>Arizona Diamondbacks</option>
                            <option value='Atlanta Braves'>Atlanta Braves</option>
                            <option value='Baltimore Orioles'>Baltimore Orioles</option>
                            <option value='Boston Red Sox'>Boston Red Sox</option>
                            <option value='Chicago Cubs'>Chicago Cubs</option>
                            <option value='Chicago White Sox'>Chicago White Sox</option>
                            <option value='Cincinnati Reds'>Cincinnati Reds</option>
                            <option value='Cleveland Indians'>Cleveland Guardians</option>
                            <option value='Colorado Rockies'>Colorado Rockies</option>
                            <option value='Detroit Tigers'>Detroit Tigers</option>
                            <option value='Houston Astros'>Houston Astros</option>
                            <option value='Kansas City Royals'>Kansas City Royals</option>
                            <option value='Los Angeles Angels'>Los Angeles Angels</option>
                            <option value='Los Angeles Dodgers'>Los Angeles Dodgers</option>
                            <option value='Miami Marlins'>Miami Marlins</option>
                            <option value='Milwaukee Brewers'>Milwaukee Brewers</option>
                            <option value='Minnesota Twins'>Minnesota Twins</option>
                            <option value='New York Mets'>New York Mets</option>
                            <option value='New York Yankees'>New York Yankees</option>
                            <option value='Oakland Athletics'>Oakland Athletics</option>
                            <option value='Philadelphia Phillies'>Philadelphia Phillies</option>
                            <option value='Pittsburgh Pirates'>Pittsburgh Pirates</option>
                            <option value='San Diego Padres'>San Diego Padres</option>
                            <option value='San Francisco Giants'>San Francisco Giants</option>
                            <option value='Seattle Mariners'>Seattle Mariners</option>
                            <option value='St. Louis Cardinals'>St. Louis Cardinals</option>
                            <option value='Tamba Bay Rays'>Tampa Bay Rays</option>
                            <option value='Texas Rangers'>Texas Rangers</option>
                            <option value='Toronto Blue Jays'>Toronto Blue Jays</option>
                            <option value='Washington Nationals'>Washington Nationals</option>
                        </optgroup>
                        <optgroup label='Negro League'>
                            <option value='Atlanta Black Crackers'>Atlanta Black Crackers</option>
                            <option value='Baltimore Elite Giants'>Baltimore Elite Giants</option>
                            <option value='Birmingham Black Barons'>Birmingham Black Barons</option>
                            <option value='Chicago American Giants'>Chicago American Giants</option>
                            <option value='Cuban X-Giants'>Cuban X-Giants</option>
                            <option value='Detroit Stars'>Detroit Stars</option>
                            <option value='Hilldale Club'>Hilldale Club</option>
                            <option value='Homestead Grays'>Homestead Grays</option>
                            <option value='Indianapolis ABCs'>Indianapolis ABCs</option>
                            <option value='Indianapolis Clowns'>Indianapolis Clowns</option>
                            <option value='Kansas City Monarchs'>Kansas City Monarchs</option>
                            <option value='Memphis Red Sox'>Memphis Red Sox</option>
                            <option value='Newark Eagles'>Newark Eagles</option>
                            <option value='New York Cubans'>New York Cubans</option>
                            <option value='Philadelphia Stars'>Philadelphia Stars</option>
                            <option value='Pittsburgh Crawfords'>Pittsburgh Crawfords</option>
                        </optgroup>
                        <optgroup label='Historic Teams'>
                            <option value='Baltimore Terrapins'>Baltimore Terrapins</option>
                            <option value='Boston Braves'>Boston Braves</option>
                            <option value='Brookly Dodgers'>Brooklyn Dodgers</option>
                            <option value='Brooklyn Tip-Tops'>Brooklyn Tip-Tops</option>
                            <option value='Buffalo Bisons'>Buffalo Bisons</option>
                            <option value='Chicago Whales'>Chicago Whales</option>
                            <option value="Cincinnati Kelly's Killers">Cincinnati Kelly's Killers</option>
                            <option value='Cincinnati Red Stockings'>Cincinnati Red Stockings</option>
                            <option value='Cleveland Blues'>Cleveland Blues</option>
                            <option value='Cleveland Indians'>Cleveland Indians</option>
                            <option value='Cleveland Spiders'>Cleveland Spiders</option>
                            <option value='Colombus Solons'>Colombus Solons</option>
                            <option value='Detroit Wolverines'>Detroit Wolverines</option>
                            <option value='Florida Marlins'>Florida Marlins</option>
                            <option value='Hartford Dark Blues'>Hartford Dark Blues</option>
                            <option value='Indianapolis Hoosiers'>Indianapolis Hoosiers</option>
                            <option value='Kansas City Athletics'>Kansas City Athletics</option>
                            <option value='Kansas City Packers'>Kansas City Packers</option>
                            <option value='Louisville Colonels'>Louisville Colonels</option>
                            <option value='Memphis Red Sox'>Memphis Red Sox</option>
                            <option value='Milwaukee Braves'>Milwaukee Braves</option>
                            <option value='Milwaukee Grays'>Milwaukee Grays</option>
                            <option value='Montreal Expos'>Montreal Expos</option>
                            <option value='Newark Peppers'>Newark Peppers</option>
                            <option value='New York Giants'>New York Giants</option>
                            <option value='New York Metropolitans'>New York Metropolitans</option>
                            <option value='New York Mutuals'>New York Mutuals</option>
                            <option value='Philadelphia Athletics'>Philadelphia Athletics</option>
                            <option value='Pittsburgh Rebels'>Pittsburgh Rebels</option>
                            <option value='Providence Grays'>Providence Grays</option>
                            <option value='Seattle Pilots'>Seattle Pilots</option>
                            <option value='St. Louis Browns'>St. Louis Browns</option>
                            <option value='St. Louis Brown Stockings'>St. Louis Brown Stockings</option>
                            <option value='St. Louis Maroons'>St. Louis Maroons</option>
                            <option value='St. Louis Terriers'>St. Louis Terriers</option>
                            <option value='Tampa Bay Devil Rays'>Tampa Bay Devil Rays</option>
                            <option value='Toledo Blue Stockings'>Toledo Blue Stockings</option>
                            <option value='Toledo Maumees'>Toledo Maumees</option>
                            <option value='Tryo Trojans'>Troy Trojans</option>
                            <option value='Washington Senators'>Washington Senators</option>
                            <option value='Worcester Ruby Legs'>Worcester Ruby Legs</option>
                        </optgroup>
                        <optgroup label='AAA - International League'>
                            <option value='Buffalo Bisons'>Buffalo Bisons</option>
                            <option value='Charlotte Knights'>Charlotte Knights</option>
                            <option value='Colombus Clippers'>Colombus Clippers</option>
                            <option value='Durham Bulls'>Durham Bulls</option>
                            <option value='Gwinnett Stripers'>Gwinnett Stripers</option>
                            <option value='Indianapolis Indians'>Indianapolis Indians</option>
                            <option value='Iowa Cubs'>Iowa Cubs</option>
                            <option value='Jacksonville Jumbo Shrimp'>Jacksonville Jumbo Shrimp</option>
                            <option value='Lehigh Valley IronPigs'>Lehigh Valley IronPigs</option>
                            <option value='Louisville Bats'>Louisville Bats</option>
                            <option value='Memphis Redbirds'>Memphis Redbirds</option>
                            <option value='Nashville Sounds'>Nashville Sounds</option>
                            <option value='Norfolk Tides'>Norfold Tides</option>
                            <option value='Omaha Storm Chasers'>Omaha Storm Chasers</option>
                            <option value='Rochester Red Wings'>Rochester Red Wings</option>
                            <option value='Scranton/Wilkesbarre RailRiders'>Scranton/Wilkesbarre RailRiders</option>
                            <option value='St. Paul Saints'>St. Paul Saints</option>
                            <option value='Syracuse Mets'>Syracuse Mets</option>
                            <option value='Toledo Mud Hens'>Toledo Mud Hens</option>
                            <option value='Worcester Red Sox'>Worcester Red Sox</option>
                        </optgroup>
                        <optgroup label='AAA Pacific Coast League'>
                            <option value='Albuquerque Isotopes'>Albuquerque Isotopes</option>
                            <option value='El Paso Chihuahuas'>El Paso Chihuahuas</option>
                            <option value='Las Vegas Aviators'>Las Vegas Aviators</option>
                            <option value='Oklahoma City Dodgers'>Oklahoma City Dodgers</option>
                            <option value='Reno Aces'>Reno Aces</option>
                            <option value='Round Rock Express'>Round Rock Express</option>
                            <option value='Sacramento River Cats'>Sacramento River Cats</option>
                            <option value='Salt Lake Bees'>Salt Lake Bees</option>
                            <option value='Sugar Land Space Cowboys'>Sugar Land Space Cowboys</option>
                            <option value='Tacoma Rainiers'>Tacoma Rainiers</option>
                        </optgroup>
                    </select>
                </div>

                <div className='formField'>
                    <p className='label'>Password</p>
                    <input type='password' onChange={(e) => this.handleInput(e)} id='password' value={this.state.pass} />
                </div>

                <div className='formField'>
                    <p className='label'>Confirm Password</p>
                    <input type='password' onChange={(e) => this.handleInput(e)} id='confirmPassword' value={this.state.confirmPass} />
                </div>

                <div className='formField'>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        )
    }
}

export default Signup;