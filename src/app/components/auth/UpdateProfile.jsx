import React, {Component} from 'react';
import createUser from '../../helpers/auth/auth_signup_password';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../../db/db';

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: ''
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        if(e.target.id === 'firstNameInput') {
            this.setState({firstName: e.target.value})
        }
        if(e.target.id === 'lastNameInput') {
            this.setState({lastName: e.target.value})
        }
        if(e.target.id === 'username') {
            this.setState({username: e.target.value})
        }
    }

    handleSubmit(e) {
        createUser(this.state.email, this.state.pass);
        setDoc(doc(db, 'users', auth.currentUser.uid), {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username
        })
        this.props.updateView('account')
        e.preventDefault();
    }
    render() {

        return (
            <form className='NewUser' onSubmit={this.handleSubmit}>
                <div className='formField'>
                    <p className='errors'>{this.state.errors}</p>
                </div>

                <div className='formField'>
                    <p className='label'>First Name</p>
                    <input type='text' onChange={this.handleInput} id='firstNameInput' value={this.state.email}/>
                </div>

                <div className='formField'>
                    <p className='label'>Last Name</p>
                    <input type='text' onChange={(e) => this.handleInput(e)} id='lastNameInput' value={this.state.pass} />
                </div>

                <div className='formField'>
                    <p className='label'>Username</p>
                    <input type='text' onChange={(e) => this.handleInput(e)} id='username' value={this.state.confirmPass} />
                </div>

                <div className='formField'>
                    <button>Submit</button>
                </div>
            </form>
        )
    }
}

export default NewUser;