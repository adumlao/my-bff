import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';

const LoginForm = (props) => {
  const {
    email,
    password,
    handleChange,
    handleSubmit,
  } = props;
  return (
    <div>
      <form className="home-login">
        <div className='home-header'>Login</div>
        <input
          className="home-input"
          type="text"
          onChange={handleChange}
          name="email"
          id="email"
          placeholder="Username"
          value={email} />
        <input
          className="home-input"
          type="password"
          onChange={handleChange}
          name="password"
          id="password"
          placeholder="Password"
          value={password} />
        <button className="home-button" type="submit" onClick={handleSubmit}>Submit</button>
        <Link className="home-link" to="/register">New User</Link>
      </form>
    </div>
  )
}

export default LoginForm;
