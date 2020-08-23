import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { persianNumber } from '../utils/persian';
import { leftArrow, rightArrow } from '../utils/assets';

export default class MonthsViewHeading extends Component {
  static propTypes = {
    year: PropTypes.object.isRequired,
    onNextYear: PropTypes.func.isRequired,
    onPrevYear: PropTypes.func.isRequired,
    isGregorian: PropTypes.bool,
    disableYearSelector: PropTypes.bool,
  };

  static contextTypes = {
    styles: PropTypes.object,
    type: PropTypes.number,
    setCalendarMode: PropTypes.func.isRequired
  };

  handleYearClick(event) {
    const { setCalendarMode } = this.context;
    event.preventDefault();
    setCalendarMode('yearSelector');
  }

  render() {
    const { year, styles, type, isGregorian, disableYearSelector } = this.props;

    const yearFormat = isGregorian ? 'YYYY' : 'jYYYY';

    return (
      <div className={styles.heading}>
        <button disabled={disableYearSelector} className={styles.title} onClick={this.handleYearClick.bind(this)}>
          {isGregorian ? year.format(yearFormat) : persianNumber(year.format(yearFormat))}
        </button>
        <button
          type="button"
          title={isGregorian ? 'next year' : 'سال قبل'}
          style={styles.navButton}
          className={styles.prev}
          onClick={isGregorian ? this.props.onNextYear : this.props.onPrevYear}
          dangerouslySetInnerHTML={rightArrow}
        />
        <button
          type="button"
          title={isGregorian ? 'previous year' : 'سال بعد'}
          style={styles.navButton}
          className={styles.next}
          onClick={isGregorian ? this.props.onPrevYear : this.props.onNextYear}
          dangerouslySetInnerHTML={leftArrow}
        />
      </div>
    );
  }
}
