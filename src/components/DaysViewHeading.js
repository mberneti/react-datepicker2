import React, { Component, PropTypes } from 'react';
import { persianNumber } from '../utils/persian';
import { leftArrow, rightArrow } from '../utils/assets';

export default class Heading extends Component {
  static propTypes = {
    month: PropTypes.object.isRequired,
    isGregorian: PropTypes.bool
  };

  static contextTypes = {
    styles: PropTypes.object,
    nextMonth: PropTypes.func.isRequired,
    prevMonth: PropTypes.func.isRequired,
    setCalendarMode: PropTypes.func.isRequired
  };

  handleMonthClick(event) {
    const { setCalendarMode } = this.context;
    event.preventDefault();
    setCalendarMode('monthSelector');
  }

  render() {
    const { nextMonth, prevMonth } = this.context;
    const { month, styles } = this.props;

    return (
      <div className={styles.heading}>
        <button className={styles.title} onClick={this.handleMonthClick.bind(this)}>
          {this.props.isGregorian? month.locale('en').format('MMMM YYYY'):persianNumber(month.locale('fa').format('jMMMM jYYYY')) }
        </button>
        <button
          type="button"
          title="ماه قبل"
          className={styles.prev}
          onClick={prevMonth}
          dangerouslySetInnerHTML={rightArrow}
        />
        <button
          type="button"
          title="ماه بعد"
          className={styles.next}
          onClick={nextMonth}
          dangerouslySetInnerHTML={leftArrow}
        />
      </div>
    );
  }
}
