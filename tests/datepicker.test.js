import React from 'react';
import { shallow } from 'enzyme';
import Datepicker from '../src';
import moment from 'moment-jalaali';

describe('<Datepicker />', () => {

  it('should render in gregorian mode ', () => {
    const wrapper = shallow(<Datepicker value={moment()} />);
    wrapper.render();
  });
  
  it('should render in jalaali mode ', () => {
    const wrapper = shallow(<Datepicker value={moment()} isGregorian={false} />);
    wrapper.render();
  });

})