import React, { Component } from 'react';
import { auth, db } from '../../../db/db';
import { doc, getDoc } from 'firebase/firestore';

class User extends Component {
    constructor(props) {
        
        super(props);

        this.state = {
            currentUser: auth.currentUser.uid,
            profile: ''
        }

        this.getProfile = this.getProfile.bind(this);
    }

    async getProfile(id) {

        const profile = await getDoc(doc(db, 'users', id));
    
        this.setState({profile: profile.data()});
    }
    
    componentDidMount() {
        this.getProfile(this.state.currentUser);
    }

    render() {

        return (
    
            <div className='User'>

                <p className='username'>{this.state.profile.username}</p>
                <p className='uid'>{this.state.currentUser}</p>
                <p className='name'>{this.state.profile.firstName} {this.state.profile.lastName}</p>
                <p className='email'>{auth.currentUser.email}</p>
                <p className='birthdate'>{this.state.profile.birthdate}</p>
                <p className='favTeam'>{this.state.profile.favTeam}</p>
                

            </div>
    
        )
    }
}

export default User;