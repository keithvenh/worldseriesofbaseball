import React from 'react';
import login from '../../helpers/auth/login';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: ''
        }
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateEmail(event) {
        this.setState({email: event.target.value})
    }

    validatePassword(event) {
        this.setState({password: event.target.value})
    }

    handleSubmit(e) {
        if(this.state.pass === this.state.confirmPass) {
            login(this.state.email, this.state.password);
        } else {
            this.setState({error: "Passwords Don't Match."})
        }
        e.preventDefault();
    }

    render() {
        return (
            <form className="Login" onSubmit={this.handleSubmit}>

                <div className='formField'>
                    <p className='errors'>{this.state.errors}</p>
                </div>

                <div className='formField'>

                    <p className="label">Email</p>
                    <input id='login-email' className="login-email" type="email" value={this.state.email} onChange={(event) => this.validateEmail(event)} autoFocus/>

                </div>

                <div className='formField' id='login-password-container'>

                    <p className="label">Password</p>
                    <input id='login-password' className="login-password" type="password" value={this.state.password} onChange={(event) => this.validatePassword(event)} /> 
                    
                </div>
                
                <div className='formField'>
                    <button>Submit</button>
                </div>

            </form>
        )
    }
}

export default Login;
