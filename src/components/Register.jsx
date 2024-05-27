import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/register.css';
import axios from "axios";

const Register = () => {
    const [form, setForm] = useState({
      username: '',
      password: '',
      repassword: '',
    });
  
    const [error, setError] = useState(null);
    const navigate = useNavigate()
  
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (form.password !== form.repassword) {
        setError('Passwords do not match');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/user/register', {
          username: form.username,
          password: form.password,
        });
        console.log('Registration successful:', response.data);
        navigate('/login');
      } catch (error) {
        console.error('Error during registration:', error);
        setError('Registration failed. Please try again.');
      }
    };

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal" style={{ textAlign: 'center' }}>Please sign up</h1>

        <div className="form-floating">
          <input
            type="username"
            className="form-control"
            id="floatingInput"
            name="username"
            placeholder="name@example.com"
            value={form.username}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingRePassword"
            name="repassword"
            placeholder="Retype Password"
            value={form.repassword}
            onChange={handleChange}
          />
          <label htmlFor="floatingRePassword">Retype Password</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">Sign up</button>
        <p style={{ textAlign: 'center' }}>
          have an account? please <a href="/login">sign in</a>
        </p>
      </form>
    </main>
  );
};

export default Register;