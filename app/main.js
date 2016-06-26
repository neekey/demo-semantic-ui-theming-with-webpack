import React from 'react';
import { Link } from 'react-router';

export default React.createClass({

    propTypes: {
        children: React.PropTypes.node,
    },

    getInitialState() {
        return {};
    },

    render() {
        return (<div>
            <ul className="menu">
                <li><Link to="/home">home</Link></li>
                <li><Link to="/dashboard">dashboard</Link></li>
                <li><Link to="/profile">profile</Link></li>
                <li><Link to="/not-found">Not Found(will redirect to home)</Link></li>
            </ul>
            <div className="content">
                {this.props.children}
            </div>
        </div>);
    },
});
