import React from 'react';
import style from './style.scss';
import reducer from './reducer';
const pageName = 'user_item';

export default React.createClass({

    propTypes: {
        id: React.PropTypes.string,
        onClick: React.PropTypes.func,
        userCount: React.PropTypes.number,
    },

    getDefaultProps: function() {
        return {
            userCount: 0
        };
    },

    getInitialState() {
        return {};
    },

    render() {
        return (<div className={style.container} onClick={this.props.onClick}>
            users: {this.props.id}, userCount: {this.props.userCount}
        </div>);
    },
});

/* ============ redux related =========== */

function mapStateToProps(state) {
    return {
        userCount: state.userCount || 0,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onClick() {
            dispatch({
                type: 'user',
            });
        },
    };
}

export {
    pageName,
    reducer,
    mapStateToProps,
    mapDispatchToProps,
};
