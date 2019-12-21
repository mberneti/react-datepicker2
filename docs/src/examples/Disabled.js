import React from 'react'
import momentJalaali from 'moment-jalaali'
import DatePicker from '../../../src/components/DatePicker';

class component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: momentJalaali('1396/7/6', 'jYYYY/jM/jD')
    };
  }
  render() {
    return <DatePicker
      disabled={true}
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
}

const title = 'Disabled';
const code = `class component extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: momentJalaali('1396/7/6', 'jYYYY/jM/jD')
    };
  }
  render() {
    return <DatePicker
      disabled={true}
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
}
`;
const Disabled = { component, title, code };
export default Disabled;