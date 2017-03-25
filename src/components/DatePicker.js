import React, { Component, PropTypes } from 'react';
import moment from 'moment-jalaali';
import TetherComponent from 'react-tether';
import Calendar from './Calendar';
import classnames from 'classnames';
import MyTimePicker from './CustomTimePicker'

export const outsideClickIgnoreClass = 'ignore--click--outside'
moment.loadPersian();

export default class DatePicker extends Component {
  static propTypes = {
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    children: PropTypes.node,
    min: PropTypes.object,
    max: PropTypes.object,
    defaultMonth: PropTypes.object,
    inputFormat: PropTypes.string,
    removable: PropTypes.bool,
    styles: PropTypes.object,
    calendarStyles: PropTypes.object,
    calendarContainerProps: PropTypes.object,
    isGregorian: PropTypes.bool,// jalaali or gregorian
    timePicker: PropTypes.bool
  };

  static defaultProps = {
    styles: undefined,
    calendarContainerProps: {},
    isGregorian: true,
    timePicker: true
  };

  state = {
    isOpen: false,
    momentValue: this.props.defaultValue || null,
    inputValue: this.getValue(this.props.defaultValue, this.props.isGregorian, this.props.timePicker),
    inputFormat: this.props.inputFormat || this.getInputFormat(this.props.isGregorian, this.props.timePicker),
    isGregorian: this.props.isGregorian,
    timePicker: this.props.timePicker,
    timePickerComponent: this.props.timePicker ? MyTimePicker : undefined
  };

  getInputFormat(isGregorian, timePicker) {
    if (timePicker)
      return isGregorian ? 'YYYY/M/D hh:mm A' : 'jYYYY/jM/jD hh:mm A';
    return isGregorian ? 'YYYY/M/D' : 'jYYYY/jM/jD';
  }

  getValue(inputValue, isGregorian, timePicker) {
    if (!inputValue)
      return '';
    const inputFormat = this.getInputFormat(isGregorian, timePicker);
    return isGregorian ? inputValue.locale('es').format(inputFormat) : inputValue.locale('fa').format(inputFormat);
  }

  setOpen(isOpen) {

    const { momentValue } = this.state;
    if (momentValue && this.props.onChange) {
      this.props.onChange(momentValue);
    }

    this.setState({ isOpen });
  }

  componentWillMount() {
    if (this.props.value) {
      this.setMomentValue(this.props.value);
    }
  }

  componentWillReceiveProps(nextProps) {

    if ('value' in nextProps && nextProps.value !== this.props.value) {
      this.setMomentValue(nextProps.value);
    }

    if ('isGregorian' in nextProps && nextProps.isGregorian !== this.props.isGregorian) {
      const inputFormat = nextProps.isGregorian ? 'YYYY/M/D hh:mm A' : 'jYYYY/jM/jD hh:mm A';

      this.setState({
        isGregorian: nextProps.isGregorian,
        inputValue: this.getValue(nextProps.value, nextProps.isGregorian, nextProps.timePicker),
        inputFormat: inputFormat
      });
    }

    if ('timePicker' in nextProps && nextProps.timePicker !== this.props.timePicker) {
      this.setState({
        timePicker: nextProps.timePicker,
        timePickerComponent: this.props.timePicker ? MyTimePicker : undefined
      });
    }

  }

  setMomentValue(momentValue) {
    const { inputFormat, isGregorian, timePicker } = this.state;

    if (this.props.onChange) {
      this.props.onChange(momentValue);
    }

    // const inputValue = momentValue.format(inputFormat);

    const inputValue = this.getValue(momentValue, isGregorian, timePicker);

    this.setState({ momentValue, inputValue });
  }

  handleFocus() {
    this.setOpen(true);
  }

  handleBlur(event) {
    const { onBlur } = this.props;
    const { isOpen, momentValue, inputFormat } = this.state;

    if (isOpen) {
      this.refs.input.focus();
    } else if (onBlur) {
      onBlur(event);
    }

    if (momentValue) {
      const inputValue = momentValue.format(inputFormat);
      this.setState({ inputValue });
    }
  }

  handleClickOutsideCalendar() {
    this.setOpen(false);
  }

  handleSelectDay(selectedDay) {
    const { momentValue: oldValue } = this.state;
    let momentValue = selectedDay.clone();

    if (oldValue) {
      momentValue = momentValue
        .set({
          hour: oldValue.hours(),
          minute: oldValue.minutes(),
          second: oldValue.seconds()
        });
    }

    this.setMomentValue(momentValue);
  }

  handleInputChange(event) {
    const { inputFormat } = this.state;
    const inputValue = event.target.value;
    const momentValue = moment(inputValue, inputFormat);

    if (momentValue.isValid()) {
      this.setState({ momentValue });
    }

    this.setState({ inputValue });
  }

  handleInputClick() {
    if (!this.props.disabled) {
      this.setOpen(true)
    }
  }

  renderInput() {
    const { isOpen, inputValue } = this.state;

    const className = classnames(this.props.className, {
      [outsideClickIgnoreClass]: isOpen
    });

    return (
      <div>
        <input
          className={`datepicker-input ${className}`}
          type="text"
          ref="input"
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleInputChange.bind(this)}
          onClick={this.handleInputClick.bind(this)}
          value={inputValue}
        />
      </div>
    );
  }

  renderCalendar() {
    const { momentValue, isGregorian, timePickerComponent: TimePicker } = this.state;
    const { onChange, min, max, defaultMonth, styles, calendarContainerProps } = this.props;

    return (
      <div>
        <Calendar
          min={min}
          max={max}
          selectedDay={momentValue}
          defaultMonth={defaultMonth}
          onSelect={this.handleSelectDay.bind(this)}
          onClickOutside={this.handleClickOutsideCalendar.bind(this)}
          outsideClickIgnoreClass={outsideClickIgnoreClass}
          styles={styles}
          containerProps={calendarContainerProps}
          isGregorian={isGregorian}
        >
          {
            TimePicker ? (
              <TimePicker
                isGregorian={isGregorian}
                min={min}
                max={max}
                momentValue={momentValue}
                setMomentValue={this.setMomentValue.bind(this)}
              />
            ) : null
          }
        </Calendar>
      </div>
    );
  }

  removeDate() {
    const { onChange } = this.props;
    if (onChange) {
      onChange('');
    }
    this.setState({
      input: '',
      inputValue: ''
    });
  }

  render() {
    const { isOpen } = this.state;

    return (
      <TetherComponent attachment="top center">
        {this.renderInput()}
        {isOpen ? this.renderCalendar() : null}
      </TetherComponent>
    );
  }
}
