import React, { Component } from 'react';
import PropTypes from 'prop-types';
import momentJalaali from 'moment-jalaali';
import classnames from 'classnames';
import MonthsViewHeading from './MonthsViewHeading';
import { persianNumber } from '../utils/persian';
import { leftArrow, rightArrow } from '../utils/assets';

// List of months
const monthsJalaali = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند'
];

const monthsGregorian = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export default class MonthSelector extends Component {
  static propTypes = {
    styles: PropTypes.object,
    selectedMonth: PropTypes.object.isRequired,
    isGregorian: PropTypes.bool
  };

  static contextTypes = {
    setCalendarMode: PropTypes.func.isRequired,
    setMonth: PropTypes.func.isRequired
  };

  state = {
    year: this.props.selectedMonth
  };

  nextYear() {
    this.setState({
      year: this.state.year.clone().add(1, 'year')
    });
  }

  prevYear() {
    this.setState({
      year: this.state.year.clone().subtract(1, 'year')
    });
  }

  handleClick(key) {
    const { setMonth, setCalendarMode } = this.context;
    const { isGregorian } = this.props;
    const monthYearFormat = isGregorian ? 'M-YYYY' : 'jM-jYYYY';
    setMonth(momentJalaali(key, monthYearFormat));
    setCalendarMode('days');
  }

  render() {
    const { year } = this.state;
    const { selectedMonth, styles, isGregorian } = this.props;
    const yearFormat = isGregorian ? 'YYYY' : 'jYYYY';
    const monthYearFormat = isGregorian ? 'M-YYYY' : 'jM-jYYYY';
    const months = isGregorian ? monthsGregorian : monthsJalaali;

    return (
      <div className="month-selector">
        <MonthsViewHeading
          isGregorian={isGregorian}
          styles={styles}
          year={year}
          onNextYear={this.nextYear.bind(this)}
          onPrevYear={this.prevYear.bind(this)}
        />
        <div className={styles.monthsList}>
          {months.map((name, key) => {
            const buttonFingerprint = `${key + 1}-${year.format(yearFormat)}`;
            const selectedMonthFingerprint = selectedMonth.format(monthYearFormat);
            const isCurrent = selectedMonthFingerprint === buttonFingerprint;

            const className = classnames(styles.monthWrapper, {
              [styles.selected]: isCurrent
            });

            return (
              <div key={key} className={className}>
                <button onClick={this.handleClick.bind(this, buttonFingerprint)}>{name}</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
