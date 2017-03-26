import React from 'react'
import moment from 'moment'
import DatePicker from '../../src';

export default React.createClass({
  getInitialState() {
    return {
      value: moment()
    }
  },
  render() {
    return <DatePicker
      onChange={value => this.setState({ value })}
      value={this.state.value}
    />
  }
})
