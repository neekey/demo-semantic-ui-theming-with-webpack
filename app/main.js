import React from 'react';
import { Link } from 'react-router';

export default function Main(props) {
  return (<div>
    <ul className="menu">
      <li><Link to="/home">home</Link></li>
      <li><Link to="/dashboard">dashboard</Link></li>
      <li><Link to="/not-found">Not Found(will redirect to home)</Link></li>
    </ul>
    <div className="content">
      {props.children}
    </div>
  </div>);
}

Main.propTypes = {
  children: React.PropTypes.any,
};
