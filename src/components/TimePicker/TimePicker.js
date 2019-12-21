import React from 'react';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import momentJalaali from 'moment-jalaali';
import Panel from './Panel';
import placements from './placements';

function noop() {}

function refFn(field, component) {
  this[field] = component;
}

class Picker extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    clearText: PropTypes.string,
    value: PropTypes.object,
    defaultOpenValue: PropTypes.object,
    disabled: PropTypes.bool,
    allowEmpty: PropTypes.bool,
    defaultValue: PropTypes.object,
    open: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    align: PropTypes.object,
    placement: PropTypes.any,
    transitionName: PropTypes.string,
    getPopupContainer: PropTypes.func,
    placeholder: PropTypes.string,
    format: PropTypes.string,
    showHour: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    showSecond: PropTypes.bool,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    hideDisabledOptions: PropTypes.bool,
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    showAMPM: PropTypes.bool,
    panelClassName: PropTypes.string,
    isGregorian: PropTypes.bool
  };

  static defaultProps = {
    clearText: 'clear',
    prefixCls: 'rc-time-picker',
    defaultOpen: false,
    style: {},
    className: '',
    align: {},
    defaultOpenValue: momentJalaali(),
    allowEmpty: true,
    showHour: true,
    showSecond: true,
    disabledHours: noop,
    disabledMinutes: noop,
    disabledSeconds: noop,
    hideDisabledOptions: false,
    placement: 'bottomLeft',
    onChange: noop,
    onOpen: noop,
    onClose: noop
  };

  constructor(props) {
    super(props);
    this.savePanelRef = refFn.bind(this, 'panelInstance');
    const { defaultOpen, defaultValue, open = defaultOpen, value = defaultValue } = this.props;
    this.state = {
      open,
      value
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { value, open } = nextProps;
    if ('value' in nextProps) {
      this.setState({
        value
      });
    }
    if (open !== undefined) {
      this.setState({ open });
    }
  }

  setOpen = (open, callback) => {
    const { onOpen, onClose } = this.props;
    if (this.state.open !== open) {
      this.setState(
        {
          open
        },
        callback
      );
      const event = {
        open
      };
      if (open) {
        onOpen(event);
      } else {
        onClose(event);
      }
    }
  };

  onPanelChange = value => {
    this.setValue(value);
  };

  onPanelClear = () => {
    this.setValue(null);
    this.setOpen(false);
  };

  onVisibleChange = open => {
    this.setOpen(open);
  };

  onEsc = () => {
    this.setOpen(false);
    this.picker.focus();
  };

  onKeyDown = e => {
    if (e.keyCode === 40) {
      this.setOpen(true);
    }
  };

  setValue = value => {
    if (!('value' in this.props)) {
      this.setState({
        value
      });
    }
    this.props.onChange(value);
  };

  getFormat = () => {
    let { format } = this.props;

    if (this.props.format) {
      format = this.props.format;
    } else if (!this.props.showSecond) {
      format = 'HH:mm';
    } else if (!this.props.showHour) {
      format = 'mm:ss';
    } else {
      format = 'HH:mm:ss';
    }

    if (this.props.showAMPM) {
      format = `${format.replace('HH', 'hh')} A`;
    }

    return format;
  };

  getPanelElement = () => {
    const {
      prefixCls,
      placeholder,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      hideDisabledOptions,
      allowEmpty,
      showHour,
      showSecond,
      showAMPM,
      defaultOpenValue,
      clearText,
      isGregorian
    } = this.props;
    return (
      <Panel
        isGregorian={isGregorian}
        clearText={clearText}
        prefixCls={`${prefixCls}-panel`}
        ref={refs => {
          this.savePanelRef = refs;
        }}
        value={this.state.value}
        onChange={this.onPanelChange}
        onClear={this.onPanelClear}
        defaultOpenValue={defaultOpenValue}
        showHour={showHour}
        onEsc={this.onEsc}
        showSecond={showSecond}
        showAMPM={showAMPM}
        allowEmpty
        format={this.getFormat()}
        placeholder={placeholder}
        disabledHours={disabledHours}
        disabledMinutes={disabledMinutes}
        disabledSeconds={disabledSeconds}
        hideDisabledOptions={hideDisabledOptions}
      />
    );
  };

  render() {
    const {
      panelClassName,
      prefixCls,
      placeholder,
      placement,
      align,
      disabled,
      transitionName,
      style,
      className,
      showHour,
      showSecond,
      getPopupContainer
    } = this.props;
    const { open, value } = this.state;
    let popupClassName;
    if (!showHour || !showSecond) {
      popupClassName = `${prefixCls}-panel-narrow`;
    }
    return (
      <Trigger
        prefixCls={`${prefixCls}-panel  ${panelClassName}`}
        popupClassName={popupClassName}
        popup={this.getPanelElement()}
        popupAlign={align}
        builtinPlacements={placements}
        popupPlacement={placement}
        action={disabled ? [] : ['click']}
        destroyPopupOnHide
        getPopupContainer={getPopupContainer}
        popupTransitionName={transitionName}
        popupVisible={open}
        onPopupVisibleChange={this.onVisibleChange}
      >
        <span className={`${prefixCls} ${className}`} style={style}>
          <input
            className={`${prefixCls}-input`}
            ref={refs => {
              this.picker = refs;
            }}
            type="text"
            placeholder={placeholder}
            readOnly
            onKeyDown={this.onKeyDown}
            disabled={disabled}
            value={(value && value.format(this.getFormat())) || ''}
          />
          <span className={`${prefixCls}-icon`} />
        </span>
      </Trigger>
    );
  }
}

export default Picker;
