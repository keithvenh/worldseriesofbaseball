import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Password({verify}) {

  const [password, setPassword] = useState('');
  const adminPassword = process.env.REACT_APP_adminPassword;
  const navigate = useNavigate();

  function handlePasswordInput(event) {
    setPassword(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      verifyPassword();
    }
  }

  function verifyPassword() {
    if(password === adminPassword) {
      verify(true);
    } else {
      navigate('/');
    }
  }

  return(
    <div className='adminPassword'>
      <p className='adminWarning'>
        This is a restricted area. <br/> Please enter the Admin Password to Continue.
      </p>
      <input 
        className='passwordInput'
        type='password' 
        value={password} 
        onChange={handlePasswordInput}
        onKeyPress={handleKeyPress}
        autoFocus
      />
    </div>
  )
}