import React from 'react'
import moment from 'moment-jalaali'
import DatePicker from '../../src';

export default React.createClass({
  getInitialState() {
    return {
      value: moment()
    }
  },
  render() {
    return <DatePicker
      isGregorian={false}
      onChange={value => this.setState({ value })}
      value={this.state.value}
    />
  }
})
