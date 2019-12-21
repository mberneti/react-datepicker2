import React, { Component } from 'react';
import PropTypes from 'prop-types';
import momentJalaali from 'moment-jalaali';
import onClickOutside from 'react-onclickoutside';
import DaysViewHeading from './DaysViewHeading';
import DaysOfWeek from './DaysOfWeek';
import MonthSelector from './MonthSelector';
import Day from './Day';
import { getDaysOfMonth, checkToday } from '../utils/moment-helper';
import { defaultStyles } from './DefaultStyles';
import RangeList from '../utils/RangesList';
export class Calendar extends Component {
  static propTypes = {
    min: PropTypes.object,
    max: PropTypes.object,
    styles: PropTypes.object,
    selectedDay: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    defaultMonth: PropTypes.object,
    onSelect: PropTypes.func,
    onMonthChange: PropTypes.func,
    onClickOutside: PropTypes.func,
    containerProps: PropTypes.object,
    isGregorian: PropTypes.bool,
    calendarClass: PropTypes.string,
    showToggleButton: PropTypes.bool,
    toggleButtonText: PropTypes.any,
    showTodayButton: PropTypes.bool
  };

  static childContextTypes = {
    nextMonth: PropTypes.func.isRequired,
    prevMonth: PropTypes.func.isRequired,
    setCalendarMode: PropTypes.func.isRequired,
    setMonth: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired
  };

  static defaultProps = {
    styles: defaultStyles,
    containerProps: {},
    isGregorian: true,
    showToggleButton: false,
    showTodayButton: true,
    toggleButtonText: ['تاریخ شمسی', 'تاریخ میلادی']
  };

  state = {
    month: this.props.defaultMonth || this.props.selectedDay || momentJalaali(this.props.min),
    selectedDay: this.props.selectedDay || this.props.value || momentJalaali(),
    mode: 'days',
    isGregorian: this.props.isGregorian,
    ranges: new RangeList(this.props.ranges)
  };

  getChildContext() {
    return {
      nextMonth: this.nextMonth.bind(this),
      prevMonth: this.prevMonth.bind(this),
      setCalendarMode: this.setMode.bind(this),
      setMonth: this.setMonth.bind(this),
      setType: this.setMonth.bind(this)
    };
  }

  UNSAFE_componentWillReceiveProps({ selectedDay, defaultMonth, min, isGregorian, ranges }) {
    if (typeof isGregorian !== 'undefined' && isGregorian !== this.state.isGregorian) {
      this.setState({ isGregorian });
    }

    if (this.props.selectedDay !== selectedDay) {
      this.selectDay(selectedDay || momentJalaali());
    } else if (
      defaultMonth &&
      this.props.defaultMonth !== defaultMonth &&
      this.state.month === this.props.defaultMonth
    ) {
      this.setMonth(defaultMonth);
    } else if (min && this.props.min !== min && this.state.month.isSame(this.props.min)) {
      this.setMonth(min.clone());
    }

    if (JSON.stringify(this.props.ranges) !== JSON.stringify(ranges)) {
      this.setState({ ranges: new RangeList(ranges) });
    }
  }

  setMode = mode => {
    this.setState({ mode });
  };

  setMonth = month => {
    const { onMonthChange } = this.props;
    this.setState({ month });
    if (onMonthChange) {
      onMonthChange(month);
    }
  };

  setType = type => {
    this.setState({ type });
  };

  nextMonth = () => {
    const { isGregorian } = this.state;
    const monthFormat = isGregorian ? 'Month' : 'jMonth';

    this.setState(
      {
        month: this.state.month.clone().add(1, monthFormat)
      },
      () => this.props.onMonthChange && this.props.onMonthChange(this.state.month)
    );
  };

  prevMonth = () => {
    const { isGregorian } = this.state;
    const monthFormat = isGregorian ? 'Month' : 'jMonth';

    this.setState(
      {
        month: this.state.month.clone().subtract(1, monthFormat)
      },
      () => this.props.onMonthChange && this.props.onMonthChange(this.state.month)
    );
  };

  selectDay = selectedDay => {
    const { month, isGregorian } = this.state;
    const yearMonthFormat = isGregorian ? 'YYYYMM' : 'jYYYYjMM';

    // Because there's no `m1.isSame(m2, 'jMonth')`
    if (selectedDay.format(yearMonthFormat) !== month.format(yearMonthFormat)) {
      this.setState({ month: selectedDay });
    }

    this.setState({ selectedDay });
  };

  handleClickOnDay = selectedDay => {
    const { onSelect, onChange } = this.props;
    this.selectDay(selectedDay);
    if (onSelect) {
      onSelect(selectedDay);
    }
    if (onChange) onChange(selectedDay);
  };

  handleClickOutside = event => {
    if (this.props.onClickOutside) {
      this.props.onClickOutside(event);
    }
  };

  days = null;

  lastRenderedMonth = null;

  renderMonthSelector = () => {
    const { month, isGregorian } = this.state;
    const { styles } = this.props;
    return <MonthSelector styles={styles} isGregorian={isGregorian} selectedMonth={month} />;
  };

  renderDays = () => {
    const { month, selectedDay, isGregorian } = this.state;
    const { children, min, max, styles, outsideClickIgnoreClass } = this.props;

    let days;

    if (this.lastRenderedMonth === month) {
      days = this.days;
    } else {
      days = getDaysOfMonth(month, isGregorian);
      this.days = days;
      this.lastRenderedMonth = month;
    }

    const monthFormat = isGregorian ? 'MM' : 'jMM';
    const dateFormat = isGregorian ? 'YYYYMMDD' : 'jYYYYjMMjDD';

    return (
      <div className={this.props.calendarClass}>
        {children}
        <DaysViewHeading
          timePicker={this.props.timePicker}
          isGregorian={isGregorian}
          styles={styles}
          month={month}
        />
        <DaysOfWeek styles={styles} isGregorian={isGregorian} />
        <div className={styles.dayPickerContainer}>
          {days.map(day => {
            const isCurrentMonth = day.format(monthFormat) === month.format(monthFormat);
            const selected = selectedDay ? selectedDay.isSame(day, 'day') : false;
            const key = day.format(dateFormat);
            const isToday = checkToday(day.format('YYYYMMDD'));

            // disabling by old min-max props
            const disabled = (min ? day.isBefore(min) : false) || (max ? day.isAfter(max) : false);

            // new method for disabling and highlighting the ranges of days
            const dayState = this.state.ranges.getDayState(day);

            return (
              <Day
                isGregorian={isGregorian}
                key={key}
                onClick={this.handleClickOnDay}
                day={day}
                isToday={isToday}
                colors={dayState.colors}
                disabled={disabled || dayState.disabled} // disabled by old method or new range method
                selected={selected}
                isCurrentMonth={isCurrentMonth}
                styles={styles}
              />
            );
          })}
        </div>
      </div>
    );
  };
  changeCalendarMode() {
    this.setState(state => {
      return { isGregorian: !state.isGregorian };
    });
  }
  render() {
    const {
      selectedDay,
      min,
      max,
      onClickOutside,
      outsideClickIgnoreClass,
      styles,
      className,
      showTodayButton
    } = this.props;
    const { mode, isGregorian } = this.state;

    const jalaaliClassName = isGregorian ? '' : 'jalaali ';

    return (
      <div className={`${styles.calendarContainer} ${jalaaliClassName}${className}`}>
        {this.props.showToggleButton && (
          <input
            type="button"
            value={isGregorian ? this.props.toggleButtonText[0] : this.props.toggleButtonText[1]}
            onClick={this.changeCalendarMode.bind(this)}
          />
        )}
        {mode === 'monthSelector' ? this.renderMonthSelector() : this.renderDays()}
        {showTodayButton && (
          <button
            type="button"
            className="selectToday"
            onClick={() => this.handleClickOnDay(momentJalaali())}
          >
            {isGregorian ? 'today' : 'امروز'}
          </button>
        )}
      </div>
    );
  }
}

export default onClickOutside(Calendar);
