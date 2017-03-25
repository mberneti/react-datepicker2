import React from 'react'
import moment from 'moment-jalaali'
import DatePicker from '../../../src/components/DatePicker';

const component = React.createClass({
  getInitialState() {
    return {
      value: moment()
    }
  },
  render() {
    return <DatePicker
      timePicker={false}
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
});

const title = 'Disabled Timepicker';
const code = `const component = React.createClass({
  getInitialState() {
    return {
      value: moment()
    }
  },
  render() {
    return <DatePicker
      timePicker={false}
      isGregorian={false}
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
});
`;
const DisabledTimepicker = { component, title, code };
export default DisabledTimepicker;