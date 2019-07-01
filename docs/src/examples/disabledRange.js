import React from 'react'
import moment from 'moment-jalaali'
import Calendar from '../../../src/components/Calendar';

class component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment(),
      isGregorian: true
    };
  }
  render() {
    return <div>
      <Calendar 
        ranges={[]}
        value={this.state.value}
        isGregorian={this.state.isGregorian}
        inputFormat="YYYY-M-D"
        inputJalaaliFormat="jYYYY-jM-jD"
        onChange={value => this.setState({ value })}
      />
      <br />
      <button onClick={() => this.setState({ isGregorian: !this.state.isGregorian })}>
        {this.state.isGregorian ? 'switch to jalaali' : 'switch to gregorian'}
      </button>
    </div>
  }
}

const title = 'Disable By Date Range';
const code = `class component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment(),
      isGregorian:true
    };
  }
  render() {
    return <div>
            <DatePicker
              value={this.state.value}
              isGregorian={this.state.isGregorian}
              onChange={value => this.setState({ value })}
            />
            <br />
            <button onClick={() => this.setState({ isGregorian: !this.state.isGregorian })}>
              {this.state.isGregorian?'switch to jalaali':'switch to gregorian'}
            </button>
          </div>
  }
}
`;
const SwitchIsGregorian = { component, title, code };
export default SwitchIsGregorian;