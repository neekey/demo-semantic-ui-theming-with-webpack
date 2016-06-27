import React from 'react';
import { shallow, mount } from 'enzyme';
import Sinon from 'sinon';
import { expect } from 'chai';
import RouterLoader from '../app/route-loader';

describe( '<route-loader />', function(){

    it('<route-loader /> will call componentDidMount and componentWillReceiveProps and load specific component', () => {

        Sinon.spy(RouterLoader.prototype, 'componentDidMount');
        Sinon.spy(RouterLoader.prototype, 'componentWillReceiveProps');
        const defaultProps = {
            route: {
                path: 'home'
            }
        };
        const wrapper = mount(<RouterLoader {...defaultProps} />);

        expect(RouterLoader.prototype.componentDidMount.calledOnce).to.equal(true);
        expect(RouterLoader.prototype.componentWillReceiveProps.called).to.equal(false);
        expect(wrapper.text()).to.equal('home');

        const userItemProps = {
            route: {
                path: 'users/:id'
            },
            params: {
                id: '1'
            }
        };
        wrapper.setProps(userItemProps);

        expect(RouterLoader.prototype.componentWillReceiveProps.calledOnce).to.equal(true);
        expect(wrapper.text()).to.equal(`users: ${userItemProps.params.id}`);
    });
});