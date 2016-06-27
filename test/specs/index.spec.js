import React from 'react';
import { shallow, mount } from 'enzyme';
import Sinon from 'sinon';
import { expect } from 'chai';
import Home from '../../app/pages/home/index';

describe( '<Home />', function(){
    it('should render <Home />', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.text()).to.equal('home');
    });
});