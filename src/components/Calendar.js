import React, {Component, PropTypes} from 'react';
import DaysViewHeading from './DaysViewHeading';
import DaysOfWeek from './DaysOfWeek';
import MonthSelector from './MonthSelector';
import Day from './Day';
import {getDaysOfMonth} from '../utils/moment-helper';
import moment from 'moment-jalaali';
import onClickOutside from 'react-onclickoutside';
import {defaultStyles} from './DefaultStyles';

export class Calendar extends Component {
    static propTypes = {
        min: PropTypes.object,
        max: PropTypes.object,
        styles: PropTypes.object,
        selectedDayObj: PropTypes.object,
        defaultMonth: PropTypes.object,
        onSelect: PropTypes.func,
        onClickOutside: PropTypes.func,
        containerProps: PropTypes.object,
        isGregorian: PropTypes.bool,
        calendarClass: PropTypes.string,
        onNextMonth: PropTypes.func,
        onPrevMonth: PropTypes.func,
        selectedDayArray: PropTypes.array,
        isRange: PropTypes.bool,
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
        selectedDayArray: [],
        isGregorian: true
    };

    state = {
        month: this.props.defaultMonth || this.props.selectedDayObj || moment(this.props.min),
        selectedDayObj: this.props.selectedDayObj || null,
        selectedDayArray: this.props.selectedDayArray,
        mode: 'days',
        isGregorian: this.props.isGregorian,
        hoveredDay: null,
        isRange: this.props.isRange ? this.props.isRange : false,
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

    componentWillReceiveProps({selectedDayObj,selectedDayArray , defaultMonth, min}) {
       if(this.state.isRange === false) {
           if (this.props.selectedDayObj !== selectedDayObj) {
               this.selectDay(selectedDayObj);
           } else if (defaultMonth && this.props.defaultMonth !== defaultMonth && this.state.month === this.props.defaultMonth) {
               this.setMonth(defaultMonth);
           } else if (min && this.props.min !== min && this.state.month.isSame(this.props.min)) {
               this.setMonth(min.clone());
           }
       }
       else{
           console.log("selected day new",selectedDayArray);
           console.log("selected day old",this.props.selectedDayArray);
           if (this.props.selectedDayArray !== selectedDayArray) {
               this.setState({selectedDayArray: selectedDayArray});
           }else if (defaultMonth && this.props.defaultMonth !== defaultMonth && this.state.month === this.props.defaultMonth) {
               this.setMonth(defaultMonth);
           } else if (min && this.props.min !== min && this.state.month.isSame(this.props.min)) {
               this.setMonth(min.clone());
           }
       }
    }

    setMode(mode) {
        this.setState({mode});
    }

    setMonth(month) {
        this.setState({month});
    }

    setType(type) {
        this.setState({type});
    }

    nextMonth() {
        const {isGregorian} = this.state;
        const monthFormat = isGregorian ? 'Month' : 'jMonth';
        if (this.props.onNextMonth) {
            this.props.onNextMonth(this.state.month.clone().add(1, monthFormat));
        }
        this.setState({
            month: this.state.month.clone().add(1, monthFormat)
        });
    }

    prevMonth() {
        const {isGregorian} = this.state;
        const monthFormat = isGregorian ? 'Month' : 'jMonth';

        if (this.props.onPrevMonth) {
            this.props.onPrevMonth(this.state.month.clone().add(1, monthFormat));
        }
        this.setState({
            month: this.state.month.clone().subtract(1, monthFormat)
        });
    }

    sameDay(selectedDayArray, givenDay, isGregorian) {
        for (let i = 0; i < selectedDayArray.length; i++) {
            const format = isGregorian ? 'YYYYMMDD' : 'jYYYYjMMjDD';
            if (givenDay.format(format) === selectedDayArray[i].format(format))
                return true;
        }

        return false
    }
    hover(selectedDay, hoveredDay, day, selected) {
        let hover = false;
        if (selectedDay.length === 1 && !!hoveredDay) {
            if (hoveredDay.isSameOrAfter(selectedDay[0]) && day.isBetween(selectedDay[0], hoveredDay, null, '(]')) {
                hover = true;
            }
        } else if (selectedDay.length === 2) {
            if (selectedDay[1].isSameOrAfter(selectedDay[0]) && day.isBetween(selectedDay[0], selectedDay[1], null, '()')) {
                hover = true;
            } else if (day.isBetween(selectedDay[1], selectedDay[0], null, '()')) {
                hover = true;
            }
        }

        if (selected)
            return false;

        return hover;
    }
    selectDay(givenDay) {
        if (this.state.isRange === false) {
            const {month, isGregorian} = this.state;
            const yearMonthFormat = isGregorian ? 'YYYYMM' : 'jYYYYjMM';

            // Because there's no `m1.isSame(m2, 'jMonth')`
            if (givenDay.format(yearMonthFormat) !== month.format(yearMonthFormat)) {
                this.setState({month: givenDay});
            }

            this.setState({selectedDayObj: givenDay});
        }
        else{
            const {month, isGregorian, selectedDayArray} = this.state;
            const {syncSelectedDay} = this.props;
            const yearMonthFormat = isGregorian ? 'YYYYMM' : 'jYYYYjMM';

            if (this.sameDay(selectedDayArray, givenDay, isGregorian)) {
                const format = isGregorian ? 'YYYYMMDD' : 'jYYYYjMMjDD';
                const days = selectedDayArray.filter(day => {
                    if (givenDay.format(format) !== day.format(format))
                        return day;
                });
                this.setState({selectedDayArray: days});
                syncSelectedDay({selectedDayArray: days});
            } else {
                if (selectedDayArray.length === 2) {
                    this.setState({selectedDayArray: [givenDay]});
                    syncSelectedDay({selectedDayArray: [givenDay]});
                    return;
                }

                if (selectedDayArray.length === 1 && givenDay.isAfter(selectedDayArray[0])) {
                    this.setState({selectedDayArray: [...selectedDayArray, givenDay]});
                    syncSelectedDay({selectedDayArray: [...selectedDayArray, givenDay]});
                } else {
                    this.setState({selectedDayArray: [givenDay]});
                    syncSelectedDay({selectedDayArray: [givenDay]});
                }
            }
            if (givenDay.format(yearMonthFormat) !== month.format(yearMonthFormat)) {
                this.setState({month: givenDay});
            }
        }
    }

    handleClickOnDayArray = selectedDayArray => {
        const {onSelect} = this.props;
        this.selectDay(selectedDayArray);
        if (onSelect) {
            onSelect(selectedDayArray);
        }
    }

    handleClickOnDayObj = selectedDayObj => {
        const {onSelect} = this.props;
        this.selectDay(selectedDayObj);
        if (onSelect) {
            onSelect(selectedDayObj);
        }
    };

    handleMouseOverOnDay(hoveredDay) {
        const {selectedDayArray} = this.state;
        if (!!selectedDayArray.length) {
            this.setState({hoveredDay: hoveredDay});
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
        const {month, isGregorian} = this.state;
        const {styles} = this.props;
        return (<MonthSelector styles={styles} isGregorian={isGregorian} selectedMonth={month}/>);
    }
    selectedDay(selectedDay, day) {
        let selected = false;
        for (let i = 0; i < selectedDay.length; i++) {
            if (selectedDay[i].isSame(day, 'day')) {
                selected = true;
                break;
            }
        }

        return selected;
    }

    renderDays() {
        const {month, selectedDayObj, isGregorian , hoveredDay ,selectedDayArray} = this.state;
        const {children, min, max, styles, outsideClickIgnoreClass} = this.props;

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
                <DaysViewHeading isGregorian={isGregorian} styles={styles} month={month}/>
                <DaysOfWeek styles={styles} isGregorian={isGregorian}/>
                <div className={styles.dayPickerContainer}>
                    {
                        days.map(day => {
                            const isCurrentMonth = day.format(monthFormat) === month.format(monthFormat);
                            const disabled = (min ? day.isBefore(min) : false) || (max ? day.isAfter(max) : false);
                            const selected = (this.state.isRange === false) ? (selectedDayObj ?  selectedDayObj.isSame(day, 'day') : false) : this.selectedDay(selectedDayArray, day);
                            let hover = this.hover(selectedDayArray, hoveredDay, day, selected);
                            return (
                                <Day
                                    isGregorian={isGregorian}
                                    key={day.format(dateFormat)}
                                    onClick={(this.state.isRange) ? this.handleClickOnDayArray : this.handleClickOnDayObj}
                                    onMouseOver={(this.state.isRange) ? this.handleMouseOverOnDay.bind(this) : null}
                                    day={day}
                                    disabled={disabled}
                                    selected={selected}
                                    isCurrentMonth={isCurrentMonth}
                                    styles={styles}
                                    hovered={(this.state.isRange === false) ? false : hover }
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
            selectedDayObj,
            min,
            max,
            onClickOutside,
            outsideClickIgnoreClass,
            styles,
            className
        } = this.props;
        const {mode, isGregorian} = this.state;

        const jalaaliClassName = isGregorian ? '' : 'jalaali ';

        return (
            <div className={styles.calendarContainer + ' ' + jalaaliClassName + className}>
                {mode === 'monthSelector' ? this.renderMonthSelector() : this.renderDays()}
            </div>
        );
    }
}


export default onClickOutside(Calendar);
