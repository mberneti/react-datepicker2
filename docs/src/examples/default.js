import React from 'react'
import moment from 'moment'
import DatePicker from '../../../src/components/DatePicker';

class SampleComponent extends React.Component{
  state = {
      value: moment()
  }
  render() {
    return <DatePicker
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
}

const title = 'Default';
const code = `class DefaultComponent extends React.Component{
  state = {
      value: moment()
  }
  render() {
    return <DatePicker
      value={this.state.value}
      onChange={value => this.setState({ value })}
    />
  }
}
`;
const Default = { SampleComponent, title, code };

export default Default;
