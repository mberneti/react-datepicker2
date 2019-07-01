import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Day of week names for use in date-picker heading
const dayOfWeekNamesJalaali = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
const dayOfWeekNamesGregorian = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default class DaysOfWeek extends Component {
  static propTypes = {
    styles: PropTypes.object,
    isGregorian: PropTypes.bool
  };

  render() {
    const { styles, isGregorian } = this.props;

    const dayOfWeekNames = isGregorian ? dayOfWeekNamesGregorian : dayOfWeekNamesJalaali;

    return (
      <div className={styles.daysOfWeek}>
        {dayOfWeekNames.map((name, key) => (
          <div key={key}>{name}</div>
        ))}
      </div>
    );
  }
}
