import React from 'react'
import moment from 'moment-jalaali'
import DatePicker from '../../../src/components/DatePicker';

const component = React.createClass({
  getInitialState() {
    return {
      value: moment('1396/7/6', 'jYYYY/jM/jD')
    }
  },
  render() {
    return <DatePicker
      isGregorian={false}
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
});

const title = 'Jalaali';
const code = `const component = React.createClass({
  getInitialState() {
    return {
      value: moment('1396/7/6', 'jYYYY/jM/jD')
    }
  },
  render() {
    return <DatePicker
      isGregorian={false}
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
});
`;
const Jalaali = { component, title, code };
export default Jalaali;