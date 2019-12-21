import React from 'react'
import momentJalaali from 'moment-jalaali'
import Calendar from '../../../src/components/Calendar';

class component extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: momentJalaali(),
      isGregorian: true
    };

    // limit selection to current months days
    this.enabledRange = {
      min: momentJalaali().startOf('month'),
      max: momentJalaali().endOf('month')
    };

  }
  render() {
    return <div>
              <Calendar
                min={this.enabledRange.min}
                max={this.enabledRange.max}
                value={this.state.value}
                isGregorian={this.state.isGregorian}
                inputFormat="YYYY-M-D"
                inputJalaaliFormat="jYYYY-jM-jD"
                onChange={value => this.setState({ value })}
              />
              
              <br />

              <button onClick={() => this.setState({
                  isGregorian: !this.state.isGregorian
                })}>

                {this.state.isGregorian ?
                  'switch to jalaali' : 'switch to gregorian'}
              </button>
          </div>
  }
}

const title = 'Limit Selection Range';
const code = `class component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: momentJalaali(),
      isGregorian: true
    };
    // limit selection to current months days
    this.enabledRange = {
      min: momentJalaali().startOf('month'),
      max: momentJalaali().endOf('month')
    };
  }
  render() {
    return <div>
              <Calendar
                min={this.enabledRange.min}
                max={this.enabledRange.max}
                value={this.state.value}
                isGregorian={this.state.isGregorian}
                onChange={value => this.setState({ value })}
              />
              
              <br />

              <button onClick={() => this.setState({
                    isGregorian: !this.state.isGregorian 
                  })}>

              {this.state.isGregorian ?
              'switch to jalaali' : 'switch to gregorian'}
              </button>
          </div>
  }
}
`;
const SwitchIsGregorian = { component, title, code };
export default SwitchIsGregorian;