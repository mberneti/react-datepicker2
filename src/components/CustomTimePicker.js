import React, { Component } from 'react';
import PropTypes from "prop-types";
import moment from 'moment-jalaali';
import TimePicker from './TimePicker';
import { persianNumber } from '../utils/persian';

const disabledMinutes = () => {
  return [...Array(60)].map((v, i) => i).filter(v => v % 5 !== 0);
};

export default class MyTimePicker extends Component {
  static propTypes = {
    momentValue: PropTypes.object,
    setMomentValue: PropTypes.func,
    isGregorian: PropTypes.bool
  };

  static defaultProps = {
    momentValue: moment()
  };

  handleChange(value) {
    const { momentValue, min } = this.props;
    let newValue;

    if (momentValue) {
      newValue = momentValue.clone();
    } else if (min && min.isAfter(moment())) {
      newValue = min.clone();
    } else {
      newValue = moment(value);
    }

    newValue.hour(value.hour());
    newValue.minute(value.minute());

    this.props.setMomentValue(newValue);
  }

  render() {
    const { momentValue, isGregorian, outsideClickIgnoreClass } = this.props;

    return <TimePicker
          showAMPM
          isGregorian={isGregorian}
          showSecond={false}
          allowEmpty={false}
          value={momentValue}
          className={outsideClickIgnoreClass}
          popupClassName={outsideClickIgnoreClass}
          panelClassName={`${outsideClickIgnoreClass} time-picker-panel`}
          onChange={this.handleChange.bind(this)}
          disabledMinutes={disabledMinutes}
          formatter={value => persianNumber(value)}
          hideDisabledOptions
        />;
  }
}
