import React, { Component, PropTypes } from 'react';
import DaysViewHeading from './DaysViewHeading';
import DaysOfWeek from './DaysOfWeek';
import MonthSelector from './MonthSelector';
import Day from './Day';
import { getDaysOfMonth } from '../utils/moment-helper';
import moment from 'moment-jalaali';
import onClickOutside from 'react-onclickoutside';
import { defaultStyles } from './DefaultStyles';

export class Calendar extends Component {
  static propTypes = {
    min: PropTypes.object,
    max: PropTypes.object,
    styles: PropTypes.object,
    selectedDay: PropTypes.object,
    defaultMonth: PropTypes.object,
    onSelect: PropTypes.func,
    onClickOutside: PropTypes.func,
    containerProps: PropTypes.object,
    isGregorian: PropTypes.bool
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
    isGregorian: true
  };

  state = {
    month: this.props.defaultMonth || this.props.selectedDay || moment(this.props.min),
    selectedDay: this.props.selectedDay || null,
    mode: 'days',
    isGregorian: this.props.isGregorian
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

  componentWillReceiveProps({ selectedDay, defaultMonth, min }) {
    if (this.props.selectedDay !== selectedDay) {
      this.selectDay(selectedDay);
    } else if (defaultMonth && this.props.defaultMonth !== defaultMonth && this.state.month === this.props.defaultMonth) {
      this.setMonth(defaultMonth);
    } else if (min && this.props.min !== min && this.state.month.isSame(this.props.min)) {
      this.setMonth(min.clone());
    }
  }

  setMode(mode) {
    this.setState({ mode });
  }

  setMonth(month) {
    this.setState({ month });
  }

  setType(type) {
    this.setState({ type });
  }

  nextMonth() {
    const { isGregorian } = this.state;
    const monthFormat = isGregorian ? 'Month' : 'jMonth';

    this.setState({
      month: this.state.month.clone().add(1, monthFormat)
    });
  }

  prevMonth() {
    const { isGregorian } = this.state;
    const monthFormat = isGregorian ? 'Month' : 'jMonth';

    this.setState({
      month: this.state.month.clone().subtract(1, monthFormat)
    });
  }

  selectDay(selectedDay) {
    const { month, isGregorian } = this.state;
    const yearMonthFormat = isGregorian ? 'YYYYMM' : 'jYYYYjMM';

    // Because there's no `m1.isSame(m2, 'jMonth')`
    if (selectedDay.format(yearMonthFormat) !== month.format(yearMonthFormat)) {
      this.setState({ month: selectedDay });
    }

    this.setState({ selectedDay });
  }

  handleClickOnDay = selectedDay => {
    const { onSelect } = this.props;
    this.selectDay(selectedDay);
    if (onSelect) {
      onSelect(selectedDay);
    }
  };

  handleClickOutside(event) {
    if (this.props.onClickOutside) {
      this.props.onClickOutside(event);
    }
  }

  days = null;
  lastRenderedMonth = null;

  renderMonthSelector() {
    const { month, isGregorian } = this.state;
    const { styles } = this.props;
    return (<MonthSelector styles={styles} isGregorian={isGregorian} selectedMonth={month} />);
  }

  renderDays() {
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
      <div>
        {children}
        <DaysViewHeading isGregorian={isGregorian} styles={styles} month={month} />
        <DaysOfWeek styles={styles} isGregorian={isGregorian} />
        <div className={styles.dayPickerContainer}>
          {
            days.map(day => {
              const isCurrentMonth = day.format(monthFormat) === month.format(monthFormat);
              const disabled = (min ? day.isBefore(min) : false) || (max ? day.isAfter(max) : false);
              const selected = selectedDay ? selectedDay.isSame(day, 'day') : false;

              return (
                <Day
                  isGregorian={isGregorian}
                  key={day.format(dateFormat)}
                  onClick={this.handleClickOnDay}
                  day={day}
                  disabled={disabled}
                  selected={selected}
                  isCurrentMonth={isCurrentMonth}
                  styles={styles}
                />
              );
            })
          }
        </div>
      </div>
    );
  }

  render() {
    const {
      selectedDay,
      min,
      max,
      onClickOutside,
      outsideClickIgnoreClass,
      styles,
      className
    } = this.props;
    const { mode, isGregorian } = this.state;

    const jalaaliClassName = isGregorian ? '' : 'jalaali ';

    return (
      <div className={styles.calendarContainer + ' ' + jalaaliClassName + className}>
        {mode === 'monthSelector' ? this.renderMonthSelector() : this.renderDays()}
      </div>
    );
  }
}

export default onClickOutside(Calendar);
