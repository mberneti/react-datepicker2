import React from 'react'
import moment from 'moment-jalaali'
import DatePicker from '../../../src/components/DatePicker';

class SampleComponent extends React.Component{
  state = {
      value: moment(),
      isGregorian:true
  };

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

const title = 'Switch IsGregorian';
const code = `class SwitchIsGregorianComponent extends React.Component{
  state = {
      value: moment()
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
const SwitchIsGregorian = { SampleComponent, title, code };
export default SwitchIsGregorian;
