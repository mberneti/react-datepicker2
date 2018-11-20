import React from 'react'
import moment from 'moment-jalaali'
import DatePicker from '../../../src/components/DatePicker';

class SampleComponent extends React.Component{
  state = {
      value: moment()
  }
  render() {
    return <DatePicker
      timePicker={false}
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
}

const title = 'Disabled Timepicker';
const code = `class DisabledTimepickerComponent extends React.Component{
  state = {
      value: moment()
  }
  render() {
    return <DatePicker
      timePicker={false}
      isGregorian={false}
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
}
`;
const DisabledTimepicker = { SampleComponent , title, code };
export default DisabledTimepicker;
