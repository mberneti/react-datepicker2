import React from 'react';
import momentJalaali from 'moment-jalaali';
import DatePicker from '../../../src/components/DatePicker';

class component extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: momentJalaali('1396/7/6', 'jYYYY/jM/jD')
    };
  }
  render() {
    return (
      <DatePicker
        persianDigits={false}
        value={this.state.value}
        onChange={value => this.setState({ value })}
        isGregorian={false}
        timePicker={false}
      />
    );
  }
}

const title = 'Jalaali Mode With the english digits';
const code = `class component extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      value: momentJalaali('1396/7/6', 'jYYYY/jM/jD')};
  }
  render() {
    return <DatePicker
      persianDigits={false}
      value={this.state.value}
      onChange={value => this.setState({ value })}
      isGregorian={false}
      timePicker={false}
    />
  }
}
`;
const Default = { component, title, code };

export default Default;
