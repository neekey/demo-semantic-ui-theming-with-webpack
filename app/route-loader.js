import React from 'react';

export default React.createClass({

    propTypes: {
        location: React.PropTypes.object,
        route: React.PropTypes.object,
        params: React.PropTypes.object,
    },

    getInitialState() {
        return {
            componentLoaded: false,
            component: null,
        };
    },

    componentDidMount() {
        console.log('componentDidMount', this.props.location, this.props.route);
        this.loadComponent(this.props.route.path);
    },

    componentWillReceiveProps(newProps) {
        console.log('componentWillReceiveProps', newProps.location, newProps.route);
        this.loadComponent(newProps.route.path);
    },

    setUpComponent(component) {
        component = component.default || component;
        this.setState({
            componentLoaded: true,
            component,
        });
    },

    loadComponent(matchedPath) {
        this.setState({
            componentLoaded: false,
            component: null,
        });

        switch (matchedPath) {
        case 'dashboard':
            require.ensure(['./pages/dashboard/index'], require => {
                this.setUpComponent(require('./pages/dashboard/index'));
            });
            break;
        case 'profile':
            require.ensure(['./pages/profile/index'], require => {
                this.setUpComponent(require('./pages/profile/index'));
            });
            break;
        case 'users/:id':
            require.ensure(['./pages/user_item/index'], require => {
                this.setUpComponent(require('./pages/user_item/index'));
            });
            break;
        default:
            require.ensure(['./pages/home/index'], require => {
                this.setUpComponent(require('./pages/home/index'));
            });
            break;
        }
    },

    render() {
        const Component = this.state.component;
        return this.state.componentLoaded ?
            <Component {...this.props.params} /> : <div>loading component</div>;
    },

});
