import React from 'react';
import momentJalaali from 'moment-jalaali';
import DatePicker from '../../../src/components/DatePicker';

class component extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: momentJalaali() };
  }
  render() {
    return (
      <DatePicker
        showToggleButton
        value={this.state.value}
        onChange={value => this.setState({ value })}
      />
    );
  }
}

const title = 'ToggleButton';
const code = `class component extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {value: momentJalaali()};
  }
  render() {
    return <DatePicker
      showToggleButton
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
}
`;
const Default = { component, title, code };

export default Default;
