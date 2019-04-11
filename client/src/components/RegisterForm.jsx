import React from 'react';

export default (props) => {
  const {
    name,
    email,
    password,
    handleChange,
    handleSubmit,
  } = props;
  return (
    <div className="register-main">
      <div className="hey-logo" style={{ backgroundImage: 'url(/media/hey.gif)' }}></div>
      <form className="register-form">
        <input
          className="reg-input"
          type="text"
          onChange={handleChange}
          name="email"
          id="email"
          placeholder="Username"
          value={email} />
        <input
          className="reg-input"
          type="password"
          onChange={handleChange}
          name="password"
          id="password"
          placeholder="Password"
          value={password} />
        <input
          className="reg-input"
          type="text"
          onChange={handleChange}
          name="name"
          placeholder="First Name, Last Name"
          value={name} />
        <button className="reg-button" type="submit" onClick={handleSubmit}>Register</button>
      </form>
    </div>
  )
}
