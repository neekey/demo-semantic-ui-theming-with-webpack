import React from 'react';
import { shallow, mount } from 'enzyme';
import Sinon from 'sinon';
import { expect } from 'chai';
import Dashboard from '../../../app/pages/dashboard/index';

describe( '<Dashboard />', function(){
    it('should render <Dashboard />', () => {
        const props = {
            onClick: Sinon.spy(),
            clickCount: 10
        };

        const wrapper = shallow(<Dashboard {...props} />);
        expect(wrapper.text()).to.equal(`${props.clickCount} Dashboard`);
        wrapper.find('div').simulate('click');
        expect(props.onClick.called, true);
    });
});