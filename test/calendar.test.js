import React from 'react';
import { shallow } from 'enzyme';
import Calendar from '../src';
import moment from 'moment-jalaali';

describe('<Calendar />', () => {

  it('should render in gregorian mode ', () => {
    const wrapper = shallow(<Calendar value={moment()} />);
    wrapper.render();
  });

  it('should render in jalaali mode ', () => {
    const wrapper = shallow(<Calendar value={moment()} isGregorian={false} />);
    wrapper.render();
  });

})