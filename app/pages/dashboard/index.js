import React from 'react';
import reducer from './reducer';
const pageName = 'dashboard';

export default React.createClass({

    propTypes: {
        onClick: React.PropTypes.func,
        clickCount: React.PropTypes.number,
    },

    getDefaultProps() {
        return {
            clickCount: 0,
        };
    },

    getInitialState() {
        return {};
    },

    render() {
        return <div onClick={this.props.onClick}>{this.props.clickCount} Dashboard</div>;
    },
});

/* ============ redux related =========== */

function mapStateToProps(state) {
    return {
        clickCount: state.clickCount || 0,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onClick() {
            dispatch({
                type: 'dashboard',
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
