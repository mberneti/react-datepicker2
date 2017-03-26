import React from 'react'
import moment from 'moment-jalaali'
import DatePicker from '../../../src/components/DatePicker';

const component = React.createClass({
  getInitialState() {
    return {
      value: moment(),
      isGregorian:true
    }
  },
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
});

const title = 'Switch IsGregorian';
const code = `const component = React.createClass({
  getInitialState() {
    return {
      value: moment()
    }
  },
  render() {
    return <DatePicker
      isGregorian={false}
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
});
`;
const SwitchIsGregorian = { component, title, code };
export default SwitchIsGregorian;