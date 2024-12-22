import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    if (isLogin) {
      try {
        // Send the data as form data
        const response = await axios.post('http://127.0.0.1:8000/token', new URLSearchParams({
          username,
          password,
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        console.log(response.data);
        alert('Login successful');
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed');
      }
    } else {
      try {
        const response = await axios.post('http://127.0.0.1:8000/signup', {
          username,
          password,
          email,
        });
        console.log(response.data);
        alert('Signup successful');
      } catch (error) {
        console.error('Signup error:', error);
        alert('Signup failed');
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={handleAuth}>
          {isLogin ? 'Login' : 'Signup'}
        </button>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Signup" : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
};

export default App;
