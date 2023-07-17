import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Here you can perform your authentication logic,
    // such as making an API request to validate the user credentials.
    // For the sake of simplicity, let's assume the authentication is successful.
    
    // Store the user data in LocalStorage
    const user = { email, password };
    localStorage.setItem('user', JSON.stringify(user));

    // Reset the form fields
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
