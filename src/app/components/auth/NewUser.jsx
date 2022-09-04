import React, {Component} from 'react';
import createUser from '../../helpers/auth/auth_signup_password';

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            confirmPass: '',
            errors: ''
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        if(e.target.id === 'emailInput') {
            this.setState({email: e.target.value})
        }
        if(e.target.id === 'passInput') {
            this.setState({pass: e.target.value})
        }
        if(e.target.id === 'confirmPassInput') {
            this.setState({confirmPass: e.target.value})
        }
    }

    handleSubmit(e) {
        if(this.state.pass === this.state.confirmPass) {
            createUser(this.state.email, this.state.pass);
        } else {
            this.setState({error: "Passwords Don't Match."})
        }
        e.preventDefault();
    }
    render() {

        return (
            <form className='NewUser' onSubmit={this.handleSubmit}>
                <div className='formField'>
                    <p className='errors'>{this.state.errors}</p>
                </div>

                <div className='formField'>
                    <p className='label'>Email</p>
                    <input type='email' onChange={this.handleInput} id='emailInput' value={this.state.email}/>
                </div>

                <div className='formField'>
                    <p className='label'>Password</p>
                    <input type='password' onChange={(e) => this.handleInput(e)} id='passInput' value={this.state.pass} />
                </div>

                <div className='formField'>
                    <p className='label'>Confirm Password</p>
                    <input type='password' onChange={(e) => this.handleInput(e)} id='confirmPassInput' value={this.state.confirmPass} />
                </div>

                <div className='formField'>
                    <button>Submit</button>
                </div>
            </form>
        )
    }
}

export default NewUser;