import React from 'react'
import moment from 'moment'
import DatePicker from '../../../src/components/DatePicker';

const component = React.createClass({
  getInitialState() {
    return {
      value: moment()
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
      value: moment()
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