import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';

const pad = value => (value < 10 ? `0${value}` : `${value}`);

const formatOption = (option, disabledOptions) => {
  const value = pad(option);

  let disabled = false;
  if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
    disabled = true;
  }

  return {
    value,
    disabled
  };
};

class Combobox extends React.Component {
  static propTypes = {
    format: PropTypes.string,
    defaultOpenValue: PropTypes.object,
    prefixCls: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    showHour: PropTypes.bool,
    showSecond: PropTypes.bool,
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    onCurrentSelectPanelChange: PropTypes.func,
    isGregorian: PropTypes.bool
  };

  onItemChange = (type, itemValue) => {
    const { onChange, defaultOpenValue } = this.props;
    const value = (this.props.value || defaultOpenValue).clone();

    if (type === 'hour') {
      value.hour(itemValue);
    } else if (type === 'minute') {
      value.minute(itemValue);
    } else if (type === 'second') {
      value.second(itemValue);
    } else {
      const actualPeriod = value.format('A');

      if (actualPeriod !== itemValue) {
        const hour24style = value.hour();
        const hour12style = hour24style < 12 ? hour24style : hour24style - 12;

        if (itemValue === 'PM') {
          value.hour(hour12style + 12);
        } else {
          value.hour(hour12style);
        }
      }
    }

    onChange(value);
  };

  onEnterSelectPanel = range => {
    this.props.onCurrentSelectPanelChange(range);
  };

  getHourSelect = hour => {
    const { prefixCls, showAMPM, disabledHours, showHour } = this.props;
    if (!showHour) {
      return null;
    }

    const disabledOptions = disabledHours();
    let { hourOptions } = this.props;
    let formattedOptions = hourOptions.map(option => formatOption(option, disabledOptions));

    if (showAMPM) {
      hourOptions = hourOptions.filter(value => (hour < 12 ? value < 12 : value >= 12));
      formattedOptions = formattedOptions
        .map(option => ({
          ...option,
          label: option.value <= 12 ? option.value : pad(option.value - 12)
        }))
        .filter(({ value }) => (hour < 12 ? Number(value) < 12 : Number(value) >= 12));
    }

    return (
      <Select
        prefixCls={prefixCls}
        options={formattedOptions}
        selectedIndex={hourOptions.indexOf(hour)}
        type="hour"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'hour')}
      />
    );
  };

  getMinuteSelect = minute => {
    const { prefixCls, minuteOptions, disabledMinutes, defaultOpenValue } = this.props;
    const value = this.props.value || defaultOpenValue;
    const disabledOptions = disabledMinutes(value.hour());

    return (
      <Select
        prefixCls={prefixCls}
        options={minuteOptions.map(option => formatOption(option, disabledOptions))}
        selectedIndex={minuteOptions.indexOf(minute)}
        type="minute"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'minute')}
      />
    );
  };

  getSecondSelect = second => {
    const { prefixCls, secondOptions, disabledSeconds, showSecond, defaultOpenValue } = this.props;
    if (!showSecond) {
      return null;
    }
    const value = this.props.value || defaultOpenValue;
    const disabledOptions = disabledSeconds(value.hour(), value.minute());

    return (
      <Select
        prefixCls={prefixCls}
        options={secondOptions.map(option => formatOption(option, disabledOptions))}
        selectedIndex={secondOptions.indexOf(second)}
        type="second"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'second')}
      />
    );
  };

  getAMPMSelect = period => {
    const { prefixCls, showAMPM, defaultOpenValue, isGregorian } = this.props;

    if (!showAMPM) {
      return null;
    }

    const options = [
      { value: 'AM', label: isGregorian ? 'AM' : 'ق.ظ' },
      { value: 'PM', label: isGregorian ? 'PM' : 'ب.ظ' }
    ];

    return (
      <Select
        prefixCls={prefixCls}
        options={options}
        selectedIndex={period === 'AM' ? 0 : 1}
        type="period"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'period')}
      />
    );
  };

  render() {
    const { prefixCls, defaultOpenValue } = this.props;
    const value = this.props.value || defaultOpenValue;
    return (
      <div className={`${prefixCls}-combobox`}>
        {this.getHourSelect(value.hour())}
        {this.getMinuteSelect(value.minute())}
        {this.getSecondSelect(value.second())}
        {this.getAMPMSelect(value.hour() < 12 ? 'AM' : 'PM')}
      </div>
    );
  }
}

export default Combobox;
