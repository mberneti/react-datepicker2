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

    this.disabledRanges = [
      { color: 'brown', start:momentJalaali().add(-1,'days'), end:momentJalaali().add(1,'days') },
      { color: '#00BCD4', start:momentJalaali(), end:momentJalaali().add(3,'days') },
      { color: '#FF9800', start:momentJalaali().add(1,'days'), end:momentJalaali().add(6,'days') },
    ]

  }
  render() {
    return <div>
      <Calendar
        ranges={this.disabledRanges}
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

const title = 'Highlight By Date Range';
const code = `class component extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: momentJalaali(),
      isGregorian: true
    };

    this.disabledRanges = [
      { 
        color: 'brown', 
        start:momentJalaali().add(-1,'days'), 
        end:momentJalaali().add(1,'days') 
      },
      { 
        color: '#00BCD4', 
        start:momentJalaali(), 
        end:momentJalaali().add(3,'days') 
      },
      { 
        color: '#FF9800', 
        start:momentJalaali().add(1,'days'), 
        end:momentJalaali().add(6,'days') 
      },
    ]

  }
  render() {
    return <div>
      <Calendar
        ranges={this.disabledRanges}
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
`;
const SwitchIsGregorian = { component, title, code };
export default SwitchIsGregorian;