import React, { Component, PropTypes } from 'react';
import moment from 'moment-jalaali';
import TimePicker from './TimePicker';
import { outsideClickIgnoreClass } from './DatePicker';
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
    const { momentValue,isGregorian } = this.props;

    const jalaaliClassName=isGregorian?'':'jalaali';

    const timeLabel=isGregorian?'time:':'ساعت:';

    return momentValue ? (
      <div className={`time-picker-container ${jalaaliClassName}`}>
        <div className='time-label'>{timeLabel}</div>
        <div className='time-picker-panel'>
          <TimePicker
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
          />
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
    ) : null;
  }
}
