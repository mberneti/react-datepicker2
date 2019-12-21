import React from 'react'
import momentJalaali from 'moment-jalaali'
import DatePicker from '../../../src/components/DatePicker';

class component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: momentJalaali(),
      isGregorian: true
    };
  }
  render() {
    return <div>
      <DatePicker
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

const title = 'Switch IsGregorian';
const code = `class component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: momentJalaali(),
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