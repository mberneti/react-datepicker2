import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Combobox from './Combobox';
import moment from 'moment';

function generateOptions(length, disabledOptions, hideDisabledOptions) {
  const arr = [];
  for (let value = 0; value < length; value++) {
    if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
      arr.push(value);
    }
  }
  return arr;
}

class Panel extends React.Component {
  static propTypes = {
    clearText: PropTypes.string,
    prefixCls: PropTypes.string,
    defaultOpenValue: PropTypes.object,
    value: PropTypes.object,
    placeholder: PropTypes.string,
    format: PropTypes.string,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    hideDisabledOptions: PropTypes.bool,
    onChange: PropTypes.func,
    onEsc: PropTypes.func,
    allowEmpty: PropTypes.bool,
    showHour: PropTypes.bool,
    showSecond: PropTypes.bool,
    onClear: PropTypes.func,
    showAMPM: PropTypes.bool,
    isGregorian: PropTypes.bool
  };

  getDefaultProps() {
    return {
      prefixCls: 'rc-time-picker-panel',
      onChange: noop,
      onClear: noop,
      defaultOpenValue: moment(),
    };
  }

  constructor (props) {
    super(props);
    this.state = {
      value: this.props.value,
      selectionRange: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const value = nextProps.value;
    if (value) {
      this.setState({
        value,
      });
    }
  }

  onChange(newValue) {
    this.setState({ value: newValue });
    this.props.onChange(newValue);
  }

  onClear() {
    this.props.onClear();
  }

  onCurrentSelectPanelChange(currentSelectPanel) {
    this.setState({ currentSelectPanel });
  }

  render() {
    const {
      isGregorian, formatter, prefixCls, className, placeholder, disabledHours, disabledMinutes,
      disabledSeconds, hideDisabledOptions, allowEmpty, showHour, showSecond, showAMPM,
      format, defaultOpenValue, clearText, onEsc,
    } = this.props;
    const {
      value, currentSelectPanel,
    } = this.state;
    const disabledHourOptions = disabledHours();
    const disabledMinuteOptions = disabledMinutes(value ? value.hour() : null);
    const disabledSecondOptions = disabledSeconds(value ? value.hour() : null,
      value ? value.minute() : null);
    const hourOptions = generateOptions(24, disabledHourOptions, hideDisabledOptions);
    const minuteOptions = generateOptions(60, disabledMinuteOptions, hideDisabledOptions);
    const secondOptions = generateOptions(60, disabledSecondOptions, hideDisabledOptions);

    return (
      <div className={`${prefixCls}-inner ${className}`}>
        <Header
          clearText={clearText}
          prefixCls={prefixCls}
          defaultOpenValue={defaultOpenValue}
          value={value}
          currentSelectPanel={currentSelectPanel}
          onEsc={onEsc}
          format={format}
          placeholder={placeholder}
          hourOptions={hourOptions}
          minuteOptions={minuteOptions}
          secondOptions={secondOptions}
          disabledHours={disabledHours}
          disabledMinutes={disabledMinutes}
          disabledSeconds={disabledSeconds}
          onChange={this.onChange.bind(this)}
          onClear={this.onClear.bind(this)}
          allowEmpty={allowEmpty}
        />
        <Combobox
          isGregorian={isGregorian}
          formatter={formatter}
          prefixCls={prefixCls}
          value={value}
          defaultOpenValue={defaultOpenValue}
          format={format}
          onChange={this.onChange.bind(this)}
          showAMPM={showAMPM}
          showHour={showHour}
          showSecond={showSecond}
          hourOptions={hourOptions}
          minuteOptions={minuteOptions}
          secondOptions={secondOptions}
          disabledHours={disabledHours}
          disabledMinutes={disabledMinutes}
          disabledSeconds={disabledSeconds}
          onCurrentSelectPanelChange={this.onCurrentSelectPanelChange.bind(this)}
        />
      </div>
    );
  }
}

export default Panel;
