import React from 'react';
import style from './style.scss';

export default React.createClass({

    propTypes: {
        id: React.PropTypes.string,
    },

    getInitialState() {
        return {};
    },

    render() {
        return <div className={style.container}>users: {this.props.id}</div>;
    },
});
