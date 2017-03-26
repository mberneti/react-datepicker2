import React from 'react';
import { shallow } from 'enzyme';
import Root from '../docs/src/root';

describe('<Root />', () => {

  it('should render docs ', () => {
    const wrapper = shallow(<Root />);
    wrapper.render();
  });

})