import React from 'react'
import moment from 'moment'
import DatePicker from '../../../src/components/DatePicker';

const component = React.createClass({
  getInitialState() {
    return {
      value: moment('1396/7/6', 'jYYYY/jM/jD')
    }
  },
  render() {
    return <DatePicker
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
});

const title = 'Default';
const code = `const component = React.createClass({
  getInitialState() {
    return {
      value: moment('1396/7/6', 'jYYYY/jM/jD')
    }
  },
  render() {
    return <DatePicker
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
});
`;
const Default = { component, title, code };

export default Default;