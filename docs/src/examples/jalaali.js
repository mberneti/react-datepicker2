import React from 'react'
import moment from 'moment-jalaali'
import DatePicker from '../../../src/components/DatePicker';

class SampleComponent extends React.Component{
  state = {
      value: moment('1396/7/6', 'jYYYY/jM/jD')
  }
  render() {
    return <DatePicker
      isGregorian={false}
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
}

const title = 'Jalaali';
const code = `class JalaaliComponent extends React.Component{
  state = {
      value: moment('1396/7/6', 'jYYYY/jM/jD')
  }
  render() {
    return <DatePicker
      isGregorian={false}
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
}
`;
const Jalaali = { SampleComponent, title, code };
export default Jalaali;
