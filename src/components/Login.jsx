import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/login.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('ini',username, password)
    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        username: username,
        password: password,
      });
      console.log('Login successful:', response.data.data.data);
      const userData = response.data.data.data;
      localStorage.setItem('session', JSON.stringify(response.data.data.data))
      if (userData.role === 'ADMIN') {
        navigate('/table');
      } else if (userData.role === 'CUSTOMER') {
        navigate('/home');
      } else {
        console.error('Unknown role:', userData.role);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="username"
            className="form-control"
            id="floatingInput"
            name="username"
            placeholder="name@example.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="floatingInput">username</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
        <p>doesn't have a account? please <a href="/register">sign up</a></p>
      </form>
    </main>
  );
}

export default Login;