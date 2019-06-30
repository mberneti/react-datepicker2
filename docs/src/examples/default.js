import React from 'react'
import moment from 'moment-jalaali'
import DatePicker from '../../../src/components/DatePicker';

class component extends React.Component { 
  constructor(props) {
    super(props);
    var today = new Date()
    today.setYear(today.getFullYear() - 1);
    

    this.state = {value: moment(today)};
  }
  render() {
    return <DatePicker
    isGregorian={false}
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
}

const title = 'Default';
const code = `class component extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {value: moment()};
  }
  render() {
    return <DatePicker
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
}
`;
const Default = { component, title, code };

export default Default;