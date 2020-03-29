import React, { Component } from 'react';
import PropTypes from 'prop-types';
import momentJalaali from 'moment-jalaali';
import classnames from 'classnames';
import { range } from 'lodash';
import MonthsViewHeading from './MonthsViewHeading';
import { persianNumber } from '../utils/persian';
import { leftArrow, rightArrow } from '../utils/assets';

// List of months
const yearsJalaali = range(momentJalaali(new Date()).jYear() + 1, 1300);

const yearsGregorian = range(momentJalaali(new Date()).year() + 1, 1920);

export default class YearSelector extends Component {
  static propTypes = {
    styles: PropTypes.object,
    selectedYear: PropTypes.object.isRequired,
    selectedMonth: PropTypes.object.isRequired,
    isGregorian: PropTypes.bool
  };

  static contextTypes = {
    setCalendarMode: PropTypes.func.isRequired,
    setMonth: PropTypes.func.isRequired
  };

  state = {
    year: this.props.selectedYear,
    month: this.props.selectedMonth
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
    const { year, month } = this.state;
    const { styles, isGregorian } = this.props;
    const yearFormat = isGregorian ? 'YYYY' : 'jYYYY';
    const monthFormat = isGregorian ? 'M' : 'jM';
    const years = isGregorian ? yearsGregorian : yearsJalaali;

    return (
      <div className="month-selector">
        <MonthsViewHeading
          isGregorian={isGregorian}
          styles={styles}
          year={year}
          onNextYear={this.nextYear.bind(this)}
          onPrevYear={this.prevYear.bind(this)}
        />
        <div className={styles.yearsList}>
          {years.map((name, key) => {
            const buttonFingerprint = `${month.format(monthFormat)}-${years[key]}`;
            const isCurrent = Number(year.format(yearFormat)) === years[key];

            const className = classnames(styles.yearWrapper, {
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
