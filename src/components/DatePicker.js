import React, { Component } from 'react';
import PropTypes from "prop-types";
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
    timePicker: PropTypes.bool,
    calendarClass: PropTypes.string,
    datePickerClass: PropTypes.string,
    datePickerClass: PropTypes.string,
    tetherAttachment:PropTypes.string,
    inputReadOnly:PropTypes.object,
  };

  static defaultProps = {
    styles: undefined,
    calendarContainerProps: {},
    isGregorian: true,
    timePicker: true
  };
  
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    
  this.state = {
    isOpen: false,
    momentValue: this.props.defaultValue || null,
    inputValue: this.getValue(this.props.defaultValue, this.props.isGregorian, this.props.timePicker),
    inputFormat: this.props.inputFormat || this.getInputFormat(this.props.isGregorian, this.props.timePicker),
    isGregorian: this.props.isGregorian,
    timePicker: this.props.timePicker,
    timePickerComponent: this.props.timePicker ? MyTimePicker : undefined
  };
  }



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

  setOpen=(isOpen) =>{

    const { momentValue } = this.state;

    if (momentValue && this.props.onChange) {
      this.props.onChange(momentValue);
    }

    this.setState({ isOpen });

    if(this.props.onOpen){
      this.props.onOpen(isOpen);
    }
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

    const inputValue = this.getValue(momentValue, isGregorian, timePicker);

    this.setState({ momentValue, inputValue });
  }

  handleFocus = () =>{
    this.setOpen(true);
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
    this.setOpen(false);
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

  renderInput = (ref) => {
    const { isOpen, inputValue } = this.state;

    const className = classnames(this.props.className, {
      [outsideClickIgnoreClass]: isOpen
    });

    return (
      <div ref={ref}>
        <input
          className={`datepicker-input ${className}`}
          type="text"
          ref={"input"} 
          onFocus={this.handleFocus.bind(this)}
          onChange={this.handleInputChange.bind(this)}
          onClick={this.handleInputClick.bind(this)}
          value={inputValue}
          readOnly={this.props.inputReadOnly === true }
        />
      </div>
    );
  }

  renderCalendar = (ref) => {
    const { momentValue, isGregorian, timePickerComponent: TimePicker } = this.state;
    const { onChange, min, max, defaultMonth, styles, calendarContainerProps } = this.props;

    return (
      <div ref={ref}>
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
          calendarClass={this.props.calendarClass ? this.props.calendarClass : ""}
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
      <TetherComponent 
      attachment={this.props.tetherAttachment ? this.props.tetherAttachment :"top center"}
      constraints={[
          {
            to: 'scrollParent',
            attachment: 'together',
          },
        ]}
        /* renderTarget: This is what the item will be tethered to, make sure to attach the ref */
        renderTarget={ref => (
          this.renderInput(ref)
        )}
        /* renderElement: If present, this item will be tethered to the the component returned by renderTarget */
        renderElement={ref =>
          isOpen && (
            this.renderCalendar(ref)
          )
        } />
    );
  }
}
