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
      <div>
        <DatePicker
          ref={r => {
            this.dt = r;
          }}
          value={this.state.value}
          onChange={value => this.setState({ value })}
        />
        <br />
        <button onClick={() => this.dt.removeDate()}>remove date</button>
      </div>
    );
  }
}

const title = 'Remove Date';
const code = `class component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: momentJalaali('1396/7/6', 'jYYYY/jM/jD')
    };
  }
  render() {
    return (
      <div>
        <DatePicker
          ref={r => {
            this.dt = r;
          }}
          value={this.state.value}
          onChange={value => this.setState({ value })}
        />
        <br />
        <button onClick={() => this.dt.removeDate()}>remove date</button>
      </div>
    );
  }
} }
}
`;
const Disabled = { component, title, code };
export default Disabled;
