import React from 'react';
import { shallow, mount } from 'enzyme';
import Sinon from 'sinon';
import { expect } from 'chai';
import User from '../../../app/pages/user_item/index';

describe( '<User />', function(){
    it('should render <User />', () => {
        const props = {
            onClick: Sinon.spy(),
            userCount: 10,
            id: '1'
        };

        const wrapper = shallow(<User {...props} />);
        expect(wrapper.text()).to.equal(`users: ${props.id}, userCount: ${props.userCount}`);
        wrapper.find('div').simulate('click');
        expect(props.onClick.called, true);
    });
});