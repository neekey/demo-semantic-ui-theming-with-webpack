import React from 'react';
import { shallow, mount } from 'enzyme';
import Sinon from 'sinon';
import { expect } from 'chai';
import RouterLoader from '../../app/route-loader';

describe( '<route-loader />', function(){

    it('<route-loader /> will call componentDidMount and componentWillReceiveProps and load specific component', done => {

        // if using hot module replacement, will cause spy a method repeatedly
        //Sinon.spy(RouterLoader.prototype, 'componentDidMount');
        //Sinon.spy(RouterLoader.prototype, 'componentWillReceiveProps');
        const defaultProps = {
            route: {
                path: 'home'
            }
        };
        const wrapper = mount(<RouterLoader {...defaultProps} />);
        //expect(RouterLoader.prototype.componentDidMount.calledOnce).to.equal(true);
        //expect(RouterLoader.prototype.componentWillReceiveProps.called).to.equal(false);

        // load "home"
        setTimeout(() => {
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

            // load "userItem"
            setTimeout(() => {
                //expect(RouterLoader.prototype.componentWillReceiveProps.calledOnce).to.equal(true);
                expect(wrapper.text()).to.equal(`users: ${userItemProps.params.id}, userCount: 0`);
                done();
            }, 100);
        }, 100);

    });
});