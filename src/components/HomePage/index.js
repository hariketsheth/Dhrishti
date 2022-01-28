import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from 'antd';

import './style.scss';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-nav">
          <img src={logo} alt="logo" className="logo" />
        <div className="links">
          <NavLink to="/">
            <h4>Features</h4>
          </NavLink>
          <NavLink to="/">
            <h4>Documentation</h4>
          </NavLink>
          <NavLink to="/">
            <h4>About</h4>
          </NavLink>
          <NavLink to="/">
            <h4>Team</h4>
          </NavLink>
          <Button className="demo" size="large">
            <img src={demo} alt="demo" className="demo-button" />
          </Button>
        </div>
      </div>
      <div className="content">
        <h1>Sample IWP Project</h1>
        <p>Mental Health <span className="bold">Recovery</span></p>
        <div className="buttons">
          <NavLink to="/onboarding">
            <Button className="begin" size="large">Let's Start</Button>
          </NavLink>
          <NavLink to="/onboarding">
            <Button  className="view" size="large">Tutorial</Button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
export default HomePage;