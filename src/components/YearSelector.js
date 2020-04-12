import React, { Component } from 'react';
import PropTypes from 'prop-types';
import momentJalaali from 'moment-jalaali';
import classnames from 'classnames';
import range from 'lodash.range';
import MonthsViewHeading from './MonthsViewHeading';

// List of months
const yearsJalaali = range(momentJalaali(new Date()).jYear() + 100, 1300);

const yearsGregorian = range(momentJalaali(new Date()).year() + 100, 1920);

export default class YearSelector extends Component {
  constructor(props) {
    super(props);
    this.currentYearPositionRef = React.createRef();
    this.yearsContainerRef = React.createRef();
  }

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

  getOffsetTop = element => {
    let offsetTop = 0;
    while (element) {
      console.log(element.scrollTop);
      offsetTop += element.offsetTop;
      element = element.offsetParent;
    }
    return offsetTop;
  };

  scrollToCurrentYearPositionRef = () => {
    const marginTop = 160;
    this.yearsContainerRef.current.scrollTo({
      top: this.getOffsetTop(this.currentYearPositionRef.current) - marginTop,
      behavior: 'smooth' // optional
    });
  };

  componentDidMount() {
    this.scrollToCurrentYearPositionRef();
  }

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
        <div ref={this.yearsContainerRef} className={styles.yearsList}>
          {years.map((yearItem, key) => {
            const buttonFingerprint = `${month.format(monthFormat)}-${years[key]}`;
            const isCurrent = Number(year.format(yearFormat)) === years[key];

            const isCurrentYearPosition = Number(year.format(yearFormat)) === years[key];

            const currentYearClass = classnames(styles.yearWrapper, {
              [styles.selected]: isCurrent
            });

            return (
              <div key={key} className={currentYearClass}>
                <button
                  ref={isCurrentYearPosition && this.currentYearPositionRef}
                  onClick={this.handleClick.bind(this, buttonFingerprint)}
                >
                  {yearItem}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
