import React from 'react';
import momentJalaali from 'moment-jalaali';
import DatePicker from '../../../src/components/DatePicker';

class component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: momentJalaali('1396/7/6', 'jYYYY/jM/jD'),
      setTodayOnBlur: false
    };
  }
  render() {
    return (
      <div>
        <DatePicker
          setTodayOnBlur={this.state.setTodayOnBlur}
          ref={r => {
            this.dt = r;
          }}
          value={this.state.value}
          onChange={value => this.setState({ value })}
        />
        <br />
        <button onClick={() => this.setState({ value: null })}>remove date</button>
        <button onClick={() => this.setState({ setTodayOnBlur: !this.state.setTodayOnBlur })}>setTodayOnBlur:{this.state.setTodayOnBlur.toString()}</button>
      </div>
    );
  }
}

const title = 'SetTodayOnBlur';
const code = `class component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: momentJalaali('1396/7/6', 'jYYYY/jM/jD'),
      setTodayOnBlur: false
    };
  }
  render() {
    return (
      <div>
        <DatePicker
          setTodayOnBlur={this.state.setTodayOnBlur}
          ref={r => {
            this.dt = r;
          }}
          value={this.state.value}
          onChange={value => this.setState({ value })}
        />
        <br />
        <button onClick={() => this.setState({ value: null })}>remove date</button>
        <button onClick={() => this.setState({ setTodayOnBlur: !this.state.setTodayOnBlur })}>setTodayOnBlur:{this.state.setTodayOnBlur.toString()}</button>
      </div>
    );
  }
}
`;
const Disabled = { component, title, code };
export default Disabled;
