import momentJalaali from 'moment-jalaali';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TetherComponent from 'react-tether';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import Trigger from 'rc-trigger';
import ReactDom from 'react-dom';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".calendarContainer{position:relative;border-radius:4px;-webkit-box-shadow:0 3px 15px rgba(0,0,0,.2);box-shadow:0 3px 15px rgba(0,0,0,.2);width:320px;margin:auto;text-align:center;padding:15px;background-color:#fff}.calendarContainer *{-webkit-box-sizing:border-box;box-sizing:border-box}.calendarContainer .dayPickerContainer:after,.calendarContainer .daysOfWeek:after,.calendarContainer .monthsList:after{content:'';display:block;clear:both}.datepicker-input{-webkit-box-sizing:border-box;box-sizing:border-box}.calendarContainer .heading{height:auto;font-weight:700;margin-bottom:10px}.calendarContainer .heading>button{background:0 0;margin:5px 0;border:none;text-align:center;line-height:30px;width:36px;height:32px;cursor:pointer}.calendarContainer .heading>button:hover{background-color:#f2f2f2}.calendarContainer .heading svg{width:10px;fill:#777}.calendarContainer .heading .next,.calendarContainer .heading .prev{width:42px;height:42px;border-radius:50%;margin:0}.calendarContainer .heading .prev{float:right}.calendarContainer .heading .next{float:left}.calendarContainer .heading .title{height:auto;border-radius:4px;width:auto;margin:0 5px;border:1px solid #f7f7f7;text-align:center;display:inline-block;font-weight:400;padding:4px 15px 5px 15px;line-height:1.5;font-size:1.2em;max-height:none}.jalaali.calendarContainer .heading .title{padding:4px 15px 7px 15px}.calendarContainer .dayWrapper{float:left;width:14.28571429%;margin-top:5px;position:relative}.calendarContainer .dayWrapper button{border:none;background:0 0;outline:0;width:100%;cursor:pointer;width:40px;height:40px;border-radius:50%;font-size:1.1em;padding:0;line-height:1.5;padding:0 0 1px 0}.jalaali.calendarContainer .dayWrapper button{padding:0 0 1px 0}.calendarContainer .dayWrapper button:hover{background-color:#d6f1ff}.calendarContainer .dayWrapper button[disabled]{color:#aaa;cursor:not-allowed;background-color:#ebebeb}.calendarContainer .dayWrapper button.selected{background-color:#337ab7;color:#fff}.calendarContainer .dayWrapper:not(.currentMonth) button{opacity:.5}.calendarContainer .daysOfWeek{margin-bottom:5px;padding-bottom:5px;display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;color:#919191}.calendarContainer .daysOfWeek>div{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;width:42px}.calendarContainer .monthsList{clear:both;width:100%}.calendarContainer .monthsList button{width:33.33333332%;height:25%;float:right;border:1px solid #f9f9f9;outline:0;font-size:1em;background:#fff;padding:10px 0;cursor:pointer}.calendarContainer .monthsList button:hover{background:#eee;cursor:pointer}.calendarContainer .selected button,.calendarContainer .selected button:active,.calendarContainer .selected button:focus,.calendarContainer .selected button:hover{background-color:#4285f4;color:#fff}.calendarContainer.jalaali{direction:rtl}.calendarContainer.jalaali .dayWrapper{float:right}.time-picker-container{margin-bottom:10}.time-picker-container>.time-label{float:left;line-height:30px;width:50%;text-align:center}.time-picker-container>.time-picker-panel{float:right;width:50%}.time-picker-container.jalaali>.time-label{float:right}.time-picker-container.jalaali>.time-picker-panel{float:left}.rc-time-picker{border-radius:4px;display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box;width:110px;border:1px solid #f7f7f7;font-size:1.2em}.rc-time-picker *{-webkit-box-sizing:border-box;box-sizing:border-box}.rc-time-picker-input{margin:4px 0;padding:0 15px 1px 15px;direction:ltr;text-align:center;width:100%;position:relative;display:inline-block;cursor:pointer;font-size:1em;line-height:1.5;border:none;background-image:none;background-color:transparent;-webkit-box-shadow:none;box-shadow:none}.jalaali.calendarContainer .rc-time-picker-input{padding:0 15px 3px 15px}.rc-time-picker-input:focus{-webkit-box-shadow:none;box-shadow:none;border:none;background-color:#f2f2f2}.rc-time-picker:hover{background-color:#f2f2f2}.rc-time-picker-panel{z-index:2001;width:170px;position:absolute;-webkit-box-sizing:border-box;box-sizing:border-box}.rc-time-picker-panel *{-webkit-box-sizing:border-box;box-sizing:border-box}.rc-time-picker-panel-inner{display:inline-block;position:relative;outline:0;list-style:none;font-size:12px;text-align:left;background-color:#fff;border-radius:3px;-webkit-box-shadow:0 1px 5px #ccc;box-shadow:0 1px 5px #ccc;background-clip:padding-box;border:1px solid #ccc;line-height:1.5}.rc-time-picker-panel-input{margin:0;padding:0;width:100%;cursor:default;line-height:1.5;outline:0;border:1px solid transparent;padding:4px 0;font-size:1.4em;text-align:center;font-family:inherit}.rc-time-picker-panel-input,.rc-time-picker-panel-input:hover{-webkit-box-shadow:none;box-shadow:none;border:none}.rc-time-picker-panel-input-wrap{-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;padding:6px;border-bottom:1px solid #e9e9e9}.rc-time-picker-panel-input-invalid{border-color:red}.rc-time-picker-panel-clear-btn{position:absolute;right:6px;cursor:pointer;overflow:hidden;width:20px;height:20px;text-align:center;line-height:20px;top:6px;margin:0}.rc-time-picker-panel-clear-btn:after{content:\"x\";font-size:12px;color:#aaa;display:inline-block;line-height:1;width:20px;-webkit-transition:color .3s ease;transition:color .3s ease}.rc-time-picker-panel-clear-btn:hover:after{color:#666}.rc-time-picker-panel-select{float:left;font-size:12px;border:1px solid #e9e9e9;border-width:0 1px;margin-left:-1px;-webkit-box-sizing:border-box;box-sizing:border-box;width:56px;overflow:hidden;position:relative}.rc-time-picker-panel-select-active{overflow-y:auto}.rc-time-picker-panel-select:first-child{border-left:0;margin-left:0}.rc-time-picker-panel-select:last-child{border-right:0}.rc-time-picker-panel-select ul{list-style:none;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;width:100%;max-height:144px;overflow-x:hidden;overflow-y:scroll}.rc-time-picker-panel-select li{list-style:none;-webkit-box-sizing:content-box;box-sizing:content-box;margin:0;padding:0 0 0 16px;width:100%;height:24px;line-height:24px;text-align:left;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.rc-time-picker-panel-select li:hover{background:#edfaff}li.rc-time-picker-panel-select-option-selected{background:#edfaff;color:#2db7f5}li.rc-time-picker-panel-select-option-disabled{color:#bfbfbf}li.rc-time-picker-panel-select-option-disabled:hover{background:0 0;cursor:not-allowed}.tether-element.tether-element-attached-top.tether-element-attached-center.tether-target-attached-bottom.tether-target-attached-center.tether-enabled{z-index:2000}.calendarContainer *,.datepicker-input{font-family:inherit}.today button{border:3px solid #4285f4!important}.jalaali.calendarContainer .selectToday{padding:4px 0 6px 0}.selectToday{display:block;width:100%;background:#4285f4;color:#fff;outline:0;border-radius:5px;border:0;cursor:pointer;padding:5px 0 7px 0;margin-top:2rem;-webkit-transition:.2s all ease-in-out;transition:.2s all ease-in-out;-webkit-transition-property:background;transition-property:background}.selectToday:hover{background:#1266f1}.highLightDot-container{text-align:center;bottom:0;width:100%;position:absolute;cursor:pointer;direction:ltr}.highLightDot-container .highLightDot{border:1px solid #fff;display:inline-block;width:7px;height:7px;border-radius:50%}.highLightDot-container .highLightDot:not(:first-child){margin-left:2px}";
styleInject(css);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

var latinToPersianMap = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
var latinNumbers = [/1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g, /0/g];

function prepareNumber(input) {
  var string;

  if (typeof input === 'number') {
    string = input.toString();
  } else if (typeof input === 'undefined') {
    string = '';
  } else {
    string = input;
  }

  return string;
}

function latinToPersian(string) {
  var result = string;

  for (var index = 0; index < 10; index++) {
    result = result.replace(latinNumbers[index], latinToPersianMap[index]);
  }

  return result;
}

function persianNumber(input) {
  return latinToPersian(prepareNumber(input));
}

var leftArrow = {
  __html: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 314.5 314.5" style="enable-background:new 0 0 314.5 314.5;" xml:space="preserve"><g><path class="arrow-icon" d="M125,157.5l116-116c10-10,10-24,0-34s-25-10-35,0l-133,133c-5,5-7,10-7,17s2,12,7,17l133,133c5,5,11,7,17,7s13-2,18-7c10-10,10-24,0-34L125,157.5z"/></g></svg>'
};
var rightArrow = {
  __html: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 315.5 315.5" style="enable-background:new 0 0 315.5 315.5;" xml:space="preserve"><g><path class="arrow-icon" d="M242,141L109,8c-5-5-12-8-18-8S79,3,74,8c-10,10-10,24,0,34l116,116L74,274c-10,10-10,24,0,34s25,10,35,0l133-133c5-5,7-11,7-17C249,151,247,146,242,141z"/></g></svg>'
};

var Heading =
/*#__PURE__*/
function (_Component) {
  inherits(Heading, _Component);

  function Heading() {
    classCallCheck(this, Heading);

    return possibleConstructorReturn(this, getPrototypeOf(Heading).apply(this, arguments));
  }

  createClass(Heading, [{
    key: "handleMonthClick",
    value: function handleMonthClick(event) {
      var setCalendarMode = this.context.setCalendarMode;
      event.preventDefault();
      setCalendarMode('monthSelector');
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context = this.context,
          nextMonth = _this$context.nextMonth,
          prevMonth = _this$context.prevMonth;
      var _this$props = this.props,
          month = _this$props.month,
          styles = _this$props.styles;
      return React.createElement("div", {
        className: styles.heading
      }, React.createElement("button", {
        className: styles.title,
        onClick: this.handleMonthClick.bind(this)
      }, this.props.isGregorian ? month.locale('en').format('MMMM YYYY') : persianNumber(month.locale('fa').format('jMMMM jYYYY'))), this.props.timePicker, !this.props.isGregorian && React.createElement(React.Fragment, null, React.createElement("button", {
        type: "button",
        title: "\u0645\u0627\u0647 \u0642\u0628\u0644",
        className: styles.prev,
        onClick: prevMonth,
        dangerouslySetInnerHTML: rightArrow
      }), React.createElement("button", {
        type: "button",
        title: "\u0645\u0627\u0647 \u0628\u0639\u062F",
        className: styles.next,
        onClick: nextMonth,
        dangerouslySetInnerHTML: leftArrow
      })), this.props.isGregorian && React.createElement(React.Fragment, null, React.createElement("button", {
        type: "button",
        title: "prev month",
        className: styles.next,
        onClick: prevMonth,
        dangerouslySetInnerHTML: leftArrow
      }), React.createElement("button", {
        type: "button",
        title: "next month",
        className: styles.prev,
        onClick: nextMonth,
        dangerouslySetInnerHTML: rightArrow
      })));
    }
  }]);

  return Heading;
}(Component);

defineProperty(Heading, "propTypes", {
  month: PropTypes.object.isRequired,
  isGregorian: PropTypes.bool
});

defineProperty(Heading, "contextTypes", {
  styles: PropTypes.object,
  nextMonth: PropTypes.func.isRequired,
  prevMonth: PropTypes.func.isRequired,
  setCalendarMode: PropTypes.func.isRequired
});

var dayOfWeekNamesJalaali = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
var dayOfWeekNamesGregorian = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

var DaysOfWeek =
/*#__PURE__*/
function (_Component) {
  inherits(DaysOfWeek, _Component);

  function DaysOfWeek() {
    classCallCheck(this, DaysOfWeek);

    return possibleConstructorReturn(this, getPrototypeOf(DaysOfWeek).apply(this, arguments));
  }

  createClass(DaysOfWeek, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          styles = _this$props.styles,
          isGregorian = _this$props.isGregorian;
      var dayOfWeekNames = isGregorian ? dayOfWeekNamesGregorian : dayOfWeekNamesJalaali;
      return React.createElement("div", {
        className: styles.daysOfWeek
      }, dayOfWeekNames.map(function (name, key) {
        return React.createElement("div", {
          key: key
        }, name);
      }));
    }
  }]);

  return DaysOfWeek;
}(Component);

defineProperty(DaysOfWeek, "propTypes", {
  styles: PropTypes.object,
  isGregorian: PropTypes.bool
});

var MonthsViewHeading =
/*#__PURE__*/
function (_Component) {
  inherits(MonthsViewHeading, _Component);

  function MonthsViewHeading() {
    classCallCheck(this, MonthsViewHeading);

    return possibleConstructorReturn(this, getPrototypeOf(MonthsViewHeading).apply(this, arguments));
  }

  createClass(MonthsViewHeading, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          year = _this$props.year,
          styles = _this$props.styles,
          type = _this$props.type,
          isGregorian = _this$props.isGregorian;
      var yearFormat = isGregorian ? 'YYYY' : 'jYYYY';
      return React.createElement("div", {
        className: styles.heading
      }, React.createElement("span", {
        className: styles.title
      }, isGregorian ? year.format(yearFormat) : persianNumber(year.format(yearFormat))), React.createElement("button", {
        type: "button",
        title: isGregorian ? 'before year' : 'سال قبل',
        style: styles.navButton,
        className: styles.prev,
        onClick: this.props.onPrevYear,
        dangerouslySetInnerHTML: rightArrow
      }), React.createElement("button", {
        type: "button",
        title: isGregorian ? 'next year' : 'سال بعد',
        style: styles.navButton,
        className: styles.next,
        onClick: this.props.onNextYear,
        dangerouslySetInnerHTML: leftArrow
      }));
    }
  }]);

  return MonthsViewHeading;
}(Component);

defineProperty(MonthsViewHeading, "propTypes", {
  year: PropTypes.object.isRequired,
  onNextYear: PropTypes.func.isRequired,
  onPrevYear: PropTypes.func.isRequired,
  isGregorian: PropTypes.bool
});

defineProperty(MonthsViewHeading, "contextTypes", {
  styles: PropTypes.object,
  type: PropTypes.number
});

var monthsJalaali = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
var monthsGregorian = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var MonthSelector =
/*#__PURE__*/
function (_Component) {
  inherits(MonthSelector, _Component);

  function MonthSelector() {
    var _getPrototypeOf2;

    var _this;

    classCallCheck(this, MonthSelector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(MonthSelector)).call.apply(_getPrototypeOf2, [this].concat(args)));

    defineProperty(assertThisInitialized(_this), "state", {
      year: _this.props.selectedMonth
    });

    return _this;
  }

  createClass(MonthSelector, [{
    key: "nextYear",
    value: function nextYear() {
      this.setState({
        year: this.state.year.clone().add(1, 'year')
      });
    }
  }, {
    key: "prevYear",
    value: function prevYear() {
      this.setState({
        year: this.state.year.clone().subtract(1, 'year')
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick(key) {
      var _this$context = this.context,
          setMonth = _this$context.setMonth,
          setCalendarMode = _this$context.setCalendarMode;
      var isGregorian = this.props.isGregorian;
      var monthYearFormat = isGregorian ? 'M-YYYY' : 'jM-jYYYY';
      setMonth(momentJalaali(key, monthYearFormat));
      setCalendarMode('days');
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var year = this.state.year;
      var _this$props = this.props,
          selectedMonth = _this$props.selectedMonth,
          styles = _this$props.styles,
          isGregorian = _this$props.isGregorian;
      var yearFormat = isGregorian ? 'YYYY' : 'jYYYY';
      var monthYearFormat = isGregorian ? 'M-YYYY' : 'jM-jYYYY';
      var months = isGregorian ? monthsGregorian : monthsJalaali;
      return React.createElement("div", {
        className: "month-selector"
      }, React.createElement(MonthsViewHeading, {
        isGregorian: isGregorian,
        styles: styles,
        year: year,
        onNextYear: this.nextYear.bind(this),
        onPrevYear: this.prevYear.bind(this)
      }), React.createElement("div", {
        className: styles.monthsList
      }, months.map(function (name, key) {
        var buttonFingerprint = "".concat(key + 1, "-").concat(year.format(yearFormat));
        var selectedMonthFingerprint = selectedMonth.format(monthYearFormat);
        var isCurrent = selectedMonthFingerprint === buttonFingerprint;
        var className = classnames(styles.monthWrapper, defineProperty({}, styles.selected, isCurrent));
        return React.createElement("div", {
          key: key,
          className: className
        }, React.createElement("button", {
          onClick: _this2.handleClick.bind(_this2, buttonFingerprint)
        }, name));
      })));
    }
  }]);

  return MonthSelector;
}(Component);

defineProperty(MonthSelector, "propTypes", {
  styles: PropTypes.object,
  selectedMonth: PropTypes.object.isRequired,
  isGregorian: PropTypes.bool
});

defineProperty(MonthSelector, "contextTypes", {
  setCalendarMode: PropTypes.func.isRequired,
  setMonth: PropTypes.func.isRequired
});

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;
});

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var objectWithoutProperties = _objectWithoutProperties;

var Day =
/*#__PURE__*/
function (_Component) {
  inherits(Day, _Component);

  function Day() {
    classCallCheck(this, Day);

    return possibleConstructorReturn(this, getPrototypeOf(Day).apply(this, arguments));
  }

  createClass(Day, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.selected !== this.props.selected || nextProps.disabled !== this.props.disabled || nextProps.isCurrentMonth !== this.props.isCurrentMonth;
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      var _this$props = this.props,
          onClick = _this$props.onClick,
          day = _this$props.day;

      if (onClick) {
        onClick(day);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props2 = this.props,
          day = _this$props2.day,
          disabled = _this$props2.disabled,
          selected = _this$props2.selected,
          isCurrentMonth = _this$props2.isCurrentMonth,
          onClick = _this$props2.onClick,
          styles = _this$props2.styles,
          isGregorian = _this$props2.isGregorian,
          isToday = _this$props2.isToday,
          colors = _this$props2.colors,
          rest = objectWithoutProperties(_this$props2, ["day", "disabled", "selected", "isCurrentMonth", "onClick", "styles", "isGregorian", "isToday", "colors"]);

      var className = classnames(styles.dayWrapper, (_classnames = {}, defineProperty(_classnames, styles.selected, selected), defineProperty(_classnames, styles.currentMonth, isCurrentMonth), defineProperty(_classnames, styles.today, isToday), _classnames));
      return React.createElement("div", {
        className: className
      }, React.createElement("button", _extends_1({
        type: "button",
        onClick: this.handleClick.bind(this),
        disabled: disabled
      }, rest), isGregorian ? day.format('D') : persianNumber(day.format('jD'))), React.createElement("div", {
        className: "highLightDot-container",
        onClick: this.handleClick.bind(this)
      }, colors.map(function (x, i) {
        return React.createElement("span", {
          key: i,
          className: "highLightDot",
          style: {
            backgroundColor: x
          }
        });
      })));
    }
  }]);

  return Day;
}(Component);

defineProperty(Day, "propTypes", {
  day: PropTypes.object.isRequired,
  isCurrentMonth: PropTypes.bool,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  isGregorian: PropTypes.bool
});

/**
 * Get days of a month that should be shown on a month page
 *
 * @param month A moment object
 * @returns {Array}
 */
function getDaysOfMonth(month, isGregorian) {
  var days = [];
  var monthFormat = isGregorian ? 'Month' : 'jMonth';
  var dayOffset = isGregorian ? 0 : 1;
  var current = month.clone().startOf(monthFormat);
  var end = month.clone().endOf(monthFormat); // Set start to the first day of week in the last month

  current.subtract((current.day() + dayOffset) % 7, 'days'); // Set end to the last day of week in the next month

  end.add(6 - (end.day() + dayOffset) % 7, 'days');

  while (current.isBefore(end)) {
    days.push(current.clone());
    current.add(1, 'days');
  }

  return days;
}
function addZero(val) {
  val = Number(val);
  if (val < 10) return "0".concat(val);
  return val;
}
function checkToday(compare) {
  var today = new Date();
  var todayString = String(today.getFullYear()) + addZero(String(today.getMonth() + 1)) + addZero(String(today.getDate()));
  return compare === todayString;
}

var defaultStyles = {
  calendarContainer: 'calendarContainer',
  heading: 'heading',
  prev: 'prev',
  next: 'next',
  title: 'title',
  dayWrapper: 'dayWrapper',
  currentMonth: 'currentMonth',
  daysOfWeek: 'daysOfWeek',
  monthsList: 'monthsList',
  selected: 'selected',
  today: 'today',
  dayPickerContainer: 'dayPickerContainer'
};

var MomentRange = require('moment-range');

var extendedMoment = MomentRange.extendMoment(momentJalaali);

var RangesList =
/*#__PURE__*/
function () {
  function RangesList(ranges) {
    var _this = this;

    classCallCheck(this, RangesList);

    this.ranges = [];

    if (ranges) {
      ranges.forEach(function (item) {
        _this.validateRangeObject(item);

        var range = extendedMoment.range(item.start, item.end); // include start

        var start = range.start.add(-1, 'days');

        _this.ranges.push({
          color: item.color,
          range: range,
          disabled: !!item.disabled
        });
      });
    }
  }

  createClass(RangesList, [{
    key: "getDayState",
    value: function getDayState(day) {
      var disabled = this.ranges.some(function (x) {
        return x.disabled && x.range.contains(day);
      });
      var colors = this.ranges.filter(function (x) {
        return x.color && x.range.contains(day);
      }).map(function (x) {
        return x.color;
      });
      return {
        disabled: disabled,
        colors: colors
      };
    }
  }, {
    key: "validateRangeObject",
    value: function validateRangeObject(range) {
      if (!('start' in range)) throw "'start' property is a required property of 'range' object.\n            range object: ".concat(JSON.stringify(range));
      if (!('end' in range)) throw "'end' property is a required property of 'range' object.\n            range object: ".concat(JSON.stringify(range));
    }
  }]);

  return RangesList;
}();

var Calendar =
/*#__PURE__*/
function (_Component) {
  inherits(Calendar, _Component);

  function Calendar() {
    var _getPrototypeOf2;

    var _this;

    classCallCheck(this, Calendar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Calendar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    defineProperty(assertThisInitialized(_this), "state", {
      month: _this.props.defaultMonth || _this.props.selectedDay || momentJalaali(_this.props.min),
      selectedDay: _this.props.selectedDay || _this.props.value || momentJalaali(),
      mode: 'days',
      isGregorian: _this.props.isGregorian,
      ranges: new RangesList(_this.props.ranges)
    });

    defineProperty(assertThisInitialized(_this), "setMode", function (mode) {
      _this.setState({
        mode: mode
      });
    });

    defineProperty(assertThisInitialized(_this), "setMonth", function (month) {
      var onMonthChange = _this.props.onMonthChange;

      _this.setState({
        month: month
      });

      if (onMonthChange) {
        onMonthChange(month);
      }
    });

    defineProperty(assertThisInitialized(_this), "setType", function (type) {
      _this.setState({
        type: type
      });
    });

    defineProperty(assertThisInitialized(_this), "nextMonth", function () {
      var isGregorian = _this.state.isGregorian;
      var monthFormat = isGregorian ? 'Month' : 'jMonth';

      _this.setState({
        month: _this.state.month.clone().add(1, monthFormat)
      }, function () {
        return _this.props.onMonthChange && _this.props.onMonthChange(_this.state.month);
      });
    });

    defineProperty(assertThisInitialized(_this), "prevMonth", function () {
      var isGregorian = _this.state.isGregorian;
      var monthFormat = isGregorian ? 'Month' : 'jMonth';

      _this.setState({
        month: _this.state.month.clone().subtract(1, monthFormat)
      }, function () {
        return _this.props.onMonthChange && _this.props.onMonthChange(_this.state.month);
      });
    });

    defineProperty(assertThisInitialized(_this), "selectDay", function (selectedDay) {
      var _this$state = _this.state,
          month = _this$state.month,
          isGregorian = _this$state.isGregorian;
      var yearMonthFormat = isGregorian ? 'YYYYMM' : 'jYYYYjMM'; // Because there's no `m1.isSame(m2, 'jMonth')`

      if (selectedDay.format(yearMonthFormat) !== month.format(yearMonthFormat)) {
        _this.setState({
          month: selectedDay
        });
      }

      _this.setState({
        selectedDay: selectedDay
      });
    });

    defineProperty(assertThisInitialized(_this), "handleClickOnDay", function (selectedDay) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          onChange = _this$props.onChange;

      _this.selectDay(selectedDay);

      if (onSelect) {
        onSelect(selectedDay);
      }

      if (onChange) onChange(selectedDay);
    });

    defineProperty(assertThisInitialized(_this), "handleClickOutside", function (event) {
      if (_this.props.onClickOutside) {
        _this.props.onClickOutside(event);
      }
    });

    defineProperty(assertThisInitialized(_this), "days", null);

    defineProperty(assertThisInitialized(_this), "lastRenderedMonth", null);

    defineProperty(assertThisInitialized(_this), "renderMonthSelector", function () {
      var _this$state2 = _this.state,
          month = _this$state2.month,
          isGregorian = _this$state2.isGregorian;
      var styles = _this.props.styles;
      return React.createElement(MonthSelector, {
        styles: styles,
        isGregorian: isGregorian,
        selectedMonth: month
      });
    });

    defineProperty(assertThisInitialized(_this), "renderDays", function () {
      var _this$state3 = _this.state,
          month = _this$state3.month,
          selectedDay = _this$state3.selectedDay,
          isGregorian = _this$state3.isGregorian;
      var _this$props2 = _this.props,
          children = _this$props2.children,
          min = _this$props2.min,
          max = _this$props2.max,
          styles = _this$props2.styles,
          outsideClickIgnoreClass = _this$props2.outsideClickIgnoreClass;
      var days;

      if (_this.lastRenderedMonth === month) {
        days = _this.days;
      } else {
        days = getDaysOfMonth(month, isGregorian);
        _this.days = days;
        _this.lastRenderedMonth = month;
      }

      var monthFormat = isGregorian ? 'MM' : 'jMM';
      var dateFormat = isGregorian ? 'YYYYMMDD' : 'jYYYYjMMjDD';
      return React.createElement("div", {
        className: _this.props.calendarClass
      }, children, React.createElement(Heading, {
        timePicker: _this.props.timePicker,
        isGregorian: isGregorian,
        styles: styles,
        month: month
      }), React.createElement(DaysOfWeek, {
        styles: styles,
        isGregorian: isGregorian
      }), React.createElement("div", {
        className: styles.dayPickerContainer
      }, days.map(function (day) {
        var isCurrentMonth = day.format(monthFormat) === month.format(monthFormat);
        var selected = selectedDay ? selectedDay.isSame(day, 'day') : false;
        var key = day.format(dateFormat);
        var isToday = checkToday(day.format('YYYYMMDD')); // disabling by old min-max props

        var disabled = (min ? day.isBefore(min) : false) || (max ? day.isAfter(max) : false); // new method for disabling and highlighting the ranges of days

        var dayState = _this.state.ranges.getDayState(day);

        return React.createElement(Day, {
          isGregorian: isGregorian,
          key: key,
          onClick: _this.handleClickOnDay,
          day: day,
          isToday: isToday,
          colors: dayState.colors,
          disabled: disabled || dayState.disabled // disabled by old method or new range method
          ,
          selected: selected,
          isCurrentMonth: isCurrentMonth,
          styles: styles
        });
      })));
    });

    return _this;
  }

  createClass(Calendar, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        nextMonth: this.nextMonth.bind(this),
        prevMonth: this.prevMonth.bind(this),
        setCalendarMode: this.setMode.bind(this),
        setMonth: this.setMonth.bind(this),
        setType: this.setMonth.bind(this)
      };
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(_ref) {
      var selectedDay = _ref.selectedDay,
          defaultMonth = _ref.defaultMonth,
          min = _ref.min,
          isGregorian = _ref.isGregorian,
          ranges = _ref.ranges;

      if (typeof isGregorian !== 'undefined' && isGregorian !== this.state.isGregorian) {
        this.setState({
          isGregorian: isGregorian
        });
      }

      if (this.props.selectedDay !== selectedDay) {
        this.selectDay(selectedDay || momentJalaali());
      } else if (defaultMonth && this.props.defaultMonth !== defaultMonth && this.state.month === this.props.defaultMonth) {
        this.setMonth(defaultMonth);
      } else if (min && this.props.min !== min && this.state.month.isSame(this.props.min)) {
        this.setMonth(min.clone());
      }

      if (JSON.stringify(this.props.ranges) !== JSON.stringify(ranges)) {
        this.setState({
          ranges: new RangesList(ranges)
        });
      }
    }
  }, {
    key: "changeCalendarMode",
    value: function changeCalendarMode() {
      this.setState(function (state) {
        return {
          isGregorian: !state.isGregorian
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          selectedDay = _this$props3.selectedDay,
          min = _this$props3.min,
          max = _this$props3.max,
          onClickOutside = _this$props3.onClickOutside,
          outsideClickIgnoreClass = _this$props3.outsideClickIgnoreClass,
          styles = _this$props3.styles,
          className = _this$props3.className,
          showTodayButton = _this$props3.showTodayButton;
      var _this$state4 = this.state,
          mode = _this$state4.mode,
          isGregorian = _this$state4.isGregorian;
      var jalaaliClassName = isGregorian ? '' : 'jalaali ';
      return React.createElement("div", {
        className: "".concat(styles.calendarContainer, " ").concat(jalaaliClassName).concat(className)
      }, this.props.showToggleButton && React.createElement("input", {
        type: "button",
        value: isGregorian ? this.props.toggleButtonText[0] : this.props.toggleButtonText[1],
        onClick: this.changeCalendarMode.bind(this)
      }), mode === 'monthSelector' ? this.renderMonthSelector() : this.renderDays(), showTodayButton && React.createElement("button", {
        type: "button",
        className: "selectToday",
        onClick: function onClick() {
          return _this2.handleClickOnDay(momentJalaali());
        }
      }, isGregorian ? 'today' : 'امروز'));
    }
  }]);

  return Calendar;
}(Component);

defineProperty(Calendar, "propTypes", {
  min: PropTypes.object,
  max: PropTypes.object,
  styles: PropTypes.object,
  selectedDay: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  defaultMonth: PropTypes.object,
  onSelect: PropTypes.func,
  onMonthChange: PropTypes.func,
  onClickOutside: PropTypes.func,
  containerProps: PropTypes.object,
  isGregorian: PropTypes.bool,
  calendarClass: PropTypes.string,
  showToggleButton: PropTypes.bool,
  toggleButtonText: PropTypes.any,
  showTodayButton: PropTypes.bool
});

defineProperty(Calendar, "childContextTypes", {
  nextMonth: PropTypes.func.isRequired,
  prevMonth: PropTypes.func.isRequired,
  setCalendarMode: PropTypes.func.isRequired,
  setMonth: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired
});

defineProperty(Calendar, "defaultProps", {
  styles: defaultStyles,
  containerProps: {},
  isGregorian: true,
  showToggleButton: false,
  showTodayButton: true,
  toggleButtonText: ['تاریخ شمسی', 'تاریخ میلادی']
});

var Calendar$1 = onClickOutside(Calendar);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

var iterableToArray = _iterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

var Header =
/*#__PURE__*/
function (_React$Component) {
  inherits(Header, _React$Component);

  function Header(props) {
    var _this;

    classCallCheck(this, Header);

    _this = possibleConstructorReturn(this, getPrototypeOf(Header).call(this, props));
    var _this$props = _this.props,
        value = _this$props.value,
        format = _this$props.format;
    _this.state = {
      str: value && value.format(format) || '',
      invalid: false
    };
    _this.onClear = _this.onClear.bind(assertThisInitialized(_this));
    _this.onInputChange = _this.onInputChange.bind(assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(assertThisInitialized(_this));
    return _this;
  }

  createClass(Header, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var value = nextProps.value,
          format = nextProps.format;
      this.setState({
        str: value && value.format(format) || '',
        invalid: false
      });
    }
  }, {
    key: "onInputChange",
    value: function onInputChange(event) {
      var str = event.target.value;
      this.setState({
        str: str
      });
      var _this$props2 = this.props,
          format = _this$props2.format,
          hourOptions = _this$props2.hourOptions,
          minuteOptions = _this$props2.minuteOptions,
          secondOptions = _this$props2.secondOptions,
          disabledHours = _this$props2.disabledHours,
          disabledMinutes = _this$props2.disabledMinutes,
          disabledSeconds = _this$props2.disabledSeconds,
          onChange = _this$props2.onChange,
          allowEmpty = _this$props2.allowEmpty;

      if (str) {
        var originalValue = this.props.value;
        var value = this.getProtoValue().clone();
        var parsed = momentJalaali(str, format, true);

        if (!parsed.isValid()) {
          this.setState({
            invalid: true
          });
          return;
        }

        value.hour(parsed.hour()).minute(parsed.minute()).second(parsed.second()); // if time value not allowed, response warning.

        if (hourOptions.indexOf(value.hour()) < 0 || minuteOptions.indexOf(value.minute()) < 0 || secondOptions.indexOf(value.second()) < 0) {
          this.setState({
            invalid: true
          });
          return;
        } // if time value is disabled, response warning.


        var disabledHourOptions = disabledHours();
        var disabledMinuteOptions = disabledMinutes(value.hour());
        var disabledSecondOptions = disabledSeconds(value.hour(), value.minute());

        if (disabledHourOptions && disabledHourOptions.indexOf(value.hour()) >= 0 || disabledMinuteOptions && disabledMinuteOptions.indexOf(value.minute()) >= 0 || disabledSecondOptions && disabledSecondOptions.indexOf(value.second()) >= 0) {
          this.setState({
            invalid: true
          });
          return;
        }

        if (originalValue) {
          if (originalValue.hour() !== value.hour() || originalValue.minute() !== value.minute() || originalValue.second() !== value.second()) {
            // keep other fields for rc-calendar
            var changedValue = originalValue.clone();
            changedValue.hour(value.hour());
            changedValue.minute(value.minute());
            changedValue.second(value.second());
            onChange(changedValue);
          }
        } else if (originalValue !== value) {
          onChange(value);
        }
      } else if (allowEmpty) {
        onChange(null);
      } else {
        this.setState({
          invalid: true
        });
        return;
      }

      this.setState({
        invalid: false
      });
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      if (e.keyCode === 27) {
        this.props.onEsc();
      }
    }
  }, {
    key: "onClear",
    value: function onClear() {
      this.setState({
        str: ''
      });
      this.props.onClear();
    }
  }, {
    key: "getClearButton",
    value: function getClearButton() {
      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          allowEmpty = _this$props3.allowEmpty;

      if (!allowEmpty) {
        return null;
      }

      return React.createElement("a", {
        className: "".concat(prefixCls, "-clear-btn"),
        role: "button",
        title: this.props.clearText,
        onMouseDown: this.onClear
      });
    }
  }, {
    key: "getProtoValue",
    value: function getProtoValue() {
      return this.props.value || this.props.defaultOpenValue;
    }
  }, {
    key: "getInput",
    value: function getInput() {
      var _this2 = this;

      var _this$props4 = this.props,
          prefixCls = _this$props4.prefixCls,
          placeholder = _this$props4.placeholder;
      var _this$state = this.state,
          invalid = _this$state.invalid,
          str = _this$state.str;
      var invalidClass = invalid ? "".concat(prefixCls, "-input-invalid") : '';
      return React.createElement("input", {
        className: "".concat(prefixCls, "-input  ").concat(invalidClass),
        ref: function ref(inst) {
          _this2.input = inst;
        },
        onKeyDown: this.onKeyDown,
        value: str,
        placeholder: placeholder,
        onChange: this.onInputChange
      });
    }
  }, {
    key: "render",
    value: function render() {
      var prefixCls = this.props.prefixCls;
      return React.createElement("div", {
        className: "".concat(prefixCls, "-input-wrap")
      }, this.getInput(), this.getClearButton());
    }
  }]);

  return Header;
}(React.Component);

defineProperty(Header, "propTypes", {
  format: PropTypes.string,
  prefixCls: PropTypes.string,
  disabledDate: PropTypes.func,
  placeholder: PropTypes.string,
  clearText: PropTypes.string,
  value: PropTypes.object,
  hourOptions: PropTypes.array,
  minuteOptions: PropTypes.array,
  secondOptions: PropTypes.array,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onEsc: PropTypes.func,
  allowEmpty: PropTypes.bool,
  defaultOpenValue: PropTypes.object,
  currentSelectPanel: PropTypes.string
});

var scrollTo = function scrollTo(element, to, duration) {
  var requestAnimationFrame = window.requestAnimationFrame || function requestAnimationFrameTimeout() {
    return setTimeout(arguments[0], 10);
  }; // jump to target if duration zero


  if (duration <= 0) {
    element.scrollTop = to;
    return;
  }

  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;
  requestAnimationFrame(function () {
    element.scrollTop += perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  });
};

var Select =
/*#__PURE__*/
function (_React$Component) {
  inherits(Select, _React$Component);

  function Select() {
    var _getPrototypeOf2;

    var _this;

    classCallCheck(this, Select);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Select)).call.apply(_getPrototypeOf2, [this].concat(args)));

    defineProperty(assertThisInitialized(_this), "onSelect", function (value) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          type = _this$props.type;

      _this.props.onSelect(type, value);
    });

    defineProperty(assertThisInitialized(_this), "getOptions", function () {
      var _this$props2 = _this.props,
          options = _this$props2.options,
          selectedIndex = _this$props2.selectedIndex,
          prefixCls = _this$props2.prefixCls;
      return options.map(function (item, index) {
        var _classnames;

        var cls = classnames((_classnames = {}, defineProperty(_classnames, "".concat(prefixCls, "-select-option-selected"), selectedIndex === index), defineProperty(_classnames, "".concat(prefixCls, "-select-option-disabled"), item.disabled), _classnames));
        var onclick = null;

        if (!item.disabled) {
          var value = +item.value;

          if (Number.isNaN(value)) {
            value = item.value;
          }

          onclick = _this.onSelect.bind(assertThisInitialized(_this), value);
        }

        return React.createElement("li", {
          className: cls,
          key: index,
          onClick: onclick,
          disabled: item.disabled
        }, typeof item.label !== 'undefined' ? item.label : item.value);
      });
    });

    defineProperty(assertThisInitialized(_this), "scrollToSelected", function (duration) {
      // move to selected item
      var select = ReactDom.findDOMNode(assertThisInitialized(_this));
      var list = ReactDom.findDOMNode(_this.list);
      var index = _this.props.selectedIndex;

      if (index < 0) {
        index = 0;
      }

      var topOption = list.children[index];
      var to = topOption.offsetTop;
      scrollTo(select, to, duration);
    });

    return _this;
  }

  createClass(Select, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // jump to selected option
      this.scrollToSelected(0);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // smooth scroll to selected option
      if (prevProps.selectedIndex !== this.props.selectedIndex) {
        this.scrollToSelected(120);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.props.options.length === 0) {
        return null;
      }

      var prefixCls = this.props.prefixCls;
      return React.createElement("div", {
        className: "".concat(prefixCls, "-select"),
        onMouseEnter: this.props.onMouseEnter
      }, React.createElement("ul", {
        ref: function ref(inst) {
          _this2.list = inst;
        }
      }, this.getOptions()));
    }
  }]);

  return Select;
}(React.Component);

defineProperty(Select, "propTypes", {
  prefixCls: PropTypes.string,
  options: PropTypes.array,
  selectedIndex: PropTypes.number,
  type: PropTypes.string,
  onSelect: PropTypes.func,
  onMouseEnter: PropTypes.func
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var pad = function pad(value) {
  return value < 10 ? "0".concat(value) : "".concat(value);
};

var formatOption = function formatOption(option, disabledOptions) {
  var value = pad(option);
  var disabled = false;

  if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
    disabled = true;
  }

  return {
    value: value,
    disabled: disabled
  };
};

var Combobox =
/*#__PURE__*/
function (_React$Component) {
  inherits(Combobox, _React$Component);

  function Combobox() {
    var _getPrototypeOf2;

    var _this;

    classCallCheck(this, Combobox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Combobox)).call.apply(_getPrototypeOf2, [this].concat(args)));

    defineProperty(assertThisInitialized(_this), "onItemChange", function (type, itemValue) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          defaultOpenValue = _this$props.defaultOpenValue;
      var value = (_this.props.value || defaultOpenValue).clone();

      if (type === 'hour') {
        value.hour(itemValue);
      } else if (type === 'minute') {
        value.minute(itemValue);
      } else if (type === 'second') {
        value.second(itemValue);
      } else {
        var actualPeriod = value.format('A');

        if (actualPeriod !== itemValue) {
          var hour24style = value.hour();
          var hour12style = hour24style < 12 ? hour24style : hour24style - 12;

          if (itemValue === 'PM') {
            value.hour(hour12style + 12);
          } else {
            value.hour(hour12style);
          }
        }
      }

      onChange(value);
    });

    defineProperty(assertThisInitialized(_this), "onEnterSelectPanel", function (range) {
      _this.props.onCurrentSelectPanelChange(range);
    });

    defineProperty(assertThisInitialized(_this), "getHourSelect", function (hour) {
      var _this$props2 = _this.props,
          prefixCls = _this$props2.prefixCls,
          showAMPM = _this$props2.showAMPM,
          disabledHours = _this$props2.disabledHours,
          showHour = _this$props2.showHour;

      if (!showHour) {
        return null;
      }

      var disabledOptions = disabledHours();
      var hourOptions = _this.props.hourOptions;
      var formattedOptions = hourOptions.map(function (option) {
        return formatOption(option, disabledOptions);
      });

      if (showAMPM) {
        hourOptions = hourOptions.filter(function (value) {
          return hour < 12 ? value < 12 : value >= 12;
        });
        formattedOptions = formattedOptions.map(function (option) {
          return _objectSpread({}, option, {
            label: option.value <= 12 ? option.value : pad(option.value - 12)
          });
        }).filter(function (_ref) {
          var value = _ref.value;
          return hour < 12 ? Number(value) < 12 : Number(value) >= 12;
        });
      }

      return React.createElement(Select, {
        prefixCls: prefixCls,
        options: formattedOptions,
        selectedIndex: hourOptions.indexOf(hour),
        type: "hour",
        onSelect: _this.onItemChange,
        onMouseEnter: _this.onEnterSelectPanel.bind(assertThisInitialized(_this), 'hour')
      });
    });

    defineProperty(assertThisInitialized(_this), "getMinuteSelect", function (minute) {
      var _this$props3 = _this.props,
          prefixCls = _this$props3.prefixCls,
          minuteOptions = _this$props3.minuteOptions,
          disabledMinutes = _this$props3.disabledMinutes,
          defaultOpenValue = _this$props3.defaultOpenValue;
      var value = _this.props.value || defaultOpenValue;
      var disabledOptions = disabledMinutes(value.hour());
      return React.createElement(Select, {
        prefixCls: prefixCls,
        options: minuteOptions.map(function (option) {
          return formatOption(option, disabledOptions);
        }),
        selectedIndex: minuteOptions.indexOf(minute),
        type: "minute",
        onSelect: _this.onItemChange,
        onMouseEnter: _this.onEnterSelectPanel.bind(assertThisInitialized(_this), 'minute')
      });
    });

    defineProperty(assertThisInitialized(_this), "getSecondSelect", function (second) {
      var _this$props4 = _this.props,
          prefixCls = _this$props4.prefixCls,
          secondOptions = _this$props4.secondOptions,
          disabledSeconds = _this$props4.disabledSeconds,
          showSecond = _this$props4.showSecond,
          defaultOpenValue = _this$props4.defaultOpenValue;

      if (!showSecond) {
        return null;
      }

      var value = _this.props.value || defaultOpenValue;
      var disabledOptions = disabledSeconds(value.hour(), value.minute());
      return React.createElement(Select, {
        prefixCls: prefixCls,
        options: secondOptions.map(function (option) {
          return formatOption(option, disabledOptions);
        }),
        selectedIndex: secondOptions.indexOf(second),
        type: "second",
        onSelect: _this.onItemChange,
        onMouseEnter: _this.onEnterSelectPanel.bind(assertThisInitialized(_this), 'second')
      });
    });

    defineProperty(assertThisInitialized(_this), "getAMPMSelect", function (period) {
      var _this$props5 = _this.props,
          prefixCls = _this$props5.prefixCls,
          showAMPM = _this$props5.showAMPM,
          defaultOpenValue = _this$props5.defaultOpenValue,
          isGregorian = _this$props5.isGregorian;

      if (!showAMPM) {
        return null;
      }

      var options = [{
        value: 'AM',
        label: isGregorian ? 'AM' : 'ق.ظ'
      }, {
        value: 'PM',
        label: isGregorian ? 'PM' : 'ب.ظ'
      }];
      return React.createElement(Select, {
        prefixCls: prefixCls,
        options: options,
        selectedIndex: period === 'AM' ? 0 : 1,
        type: "period",
        onSelect: _this.onItemChange,
        onMouseEnter: _this.onEnterSelectPanel.bind(assertThisInitialized(_this), 'period')
      });
    });

    return _this;
  }

  createClass(Combobox, [{
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          prefixCls = _this$props6.prefixCls,
          defaultOpenValue = _this$props6.defaultOpenValue;
      var value = this.props.value || defaultOpenValue;
      return React.createElement("div", {
        className: "".concat(prefixCls, "-combobox")
      }, this.getHourSelect(value.hour()), this.getMinuteSelect(value.minute()), this.getSecondSelect(value.second()), this.getAMPMSelect(value.hour() < 12 ? 'AM' : 'PM'));
    }
  }]);

  return Combobox;
}(React.Component);

defineProperty(Combobox, "propTypes", {
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
});

function noop() {}

function generateOptions(length, disabledOptions, hideDisabledOptions) {
  var arr = [];

  for (var value = 0; value < length; value++) {
    if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
      arr.push(value);
    }
  }

  return arr;
}

var Panel =
/*#__PURE__*/
function (_React$Component) {
  inherits(Panel, _React$Component);

  function Panel(props) {
    var _this;

    classCallCheck(this, Panel);

    _this = possibleConstructorReturn(this, getPrototypeOf(Panel).call(this, props));

    defineProperty(assertThisInitialized(_this), "onChange", function (newValue) {
      _this.setState({
        value: newValue
      });

      _this.props.onChange(newValue);
    });

    defineProperty(assertThisInitialized(_this), "onClear", function () {
      _this.props.onClear();
    });

    defineProperty(assertThisInitialized(_this), "onCurrentSelectPanelChange", function (currentSelectPanel) {
      _this.setState({
        currentSelectPanel: currentSelectPanel
      });
    });

    _this.state = {
      value: _this.props.value,
      selectionRange: []
    };
    return _this;
  }

  createClass(Panel, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var value = nextProps.value;

      if (value) {
        this.setState({
          value: value
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isGregorian = _this$props.isGregorian,
          formatter = _this$props.formatter,
          prefixCls = _this$props.prefixCls,
          className = _this$props.className,
          placeholder = _this$props.placeholder,
          disabledHours = _this$props.disabledHours,
          disabledMinutes = _this$props.disabledMinutes,
          disabledSeconds = _this$props.disabledSeconds,
          hideDisabledOptions = _this$props.hideDisabledOptions,
          allowEmpty = _this$props.allowEmpty,
          showHour = _this$props.showHour,
          showSecond = _this$props.showSecond,
          showAMPM = _this$props.showAMPM,
          format = _this$props.format,
          defaultOpenValue = _this$props.defaultOpenValue,
          clearText = _this$props.clearText,
          onEsc = _this$props.onEsc;
      var _this$state = this.state,
          value = _this$state.value,
          currentSelectPanel = _this$state.currentSelectPanel;
      var disabledHourOptions = disabledHours();
      var disabledMinuteOptions = disabledMinutes(value ? value.hour() : null);
      var disabledSecondOptions = disabledSeconds(value ? value.hour() : null, value ? value.minute() : null);
      var hourOptions = generateOptions(24, disabledHourOptions, hideDisabledOptions);
      var minuteOptions = generateOptions(60, disabledMinuteOptions, hideDisabledOptions);
      var secondOptions = generateOptions(60, disabledSecondOptions, hideDisabledOptions);
      return React.createElement("div", {
        className: "".concat(prefixCls, "-inner ").concat(className)
      }, React.createElement(Header, {
        clearText: clearText,
        prefixCls: prefixCls,
        defaultOpenValue: defaultOpenValue,
        value: value,
        currentSelectPanel: currentSelectPanel,
        onEsc: onEsc,
        format: format,
        placeholder: placeholder,
        hourOptions: hourOptions,
        minuteOptions: minuteOptions,
        secondOptions: secondOptions,
        disabledHours: disabledHours,
        disabledMinutes: disabledMinutes,
        disabledSeconds: disabledSeconds,
        onChange: this.onChange,
        onClear: this.onClear,
        allowEmpty: allowEmpty
      }), React.createElement(Combobox, {
        isGregorian: isGregorian,
        formatter: formatter,
        prefixCls: prefixCls,
        value: value,
        defaultOpenValue: defaultOpenValue,
        format: format,
        onChange: this.onChange,
        showAMPM: showAMPM,
        showHour: showHour,
        showSecond: showSecond,
        hourOptions: hourOptions,
        minuteOptions: minuteOptions,
        secondOptions: secondOptions,
        disabledHours: disabledHours,
        disabledMinutes: disabledMinutes,
        disabledSeconds: disabledSeconds,
        onCurrentSelectPanelChange: this.onCurrentSelectPanelChange
      }));
    }
  }]);

  return Panel;
}(React.Component);

defineProperty(Panel, "propTypes", {
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
});

defineProperty(Panel, "defaultProps", {
  prefixCls: 'rc-time-picker-panel',
  onChange: noop,
  onClear: noop,
  defaultOpenValue: momentJalaali()
});

var autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};
var targetOffset = [0, 0];
var placements = {
  bottomLeft: {
    points: ['tl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset: targetOffset
  },
  bottomRight: {
    points: ['tr', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset: targetOffset
  },
  topRight: {
    points: ['br', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset: targetOffset
  },
  topLeft: {
    points: ['bl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset: targetOffset
  }
};

function noop$1() {}

function refFn(field, component) {
  this[field] = component;
}

var Picker =
/*#__PURE__*/
function (_React$Component) {
  inherits(Picker, _React$Component);

  function Picker(props) {
    var _this;

    classCallCheck(this, Picker);

    _this = possibleConstructorReturn(this, getPrototypeOf(Picker).call(this, props));

    defineProperty(assertThisInitialized(_this), "setOpen", function (open, callback) {
      var _this$props = _this.props,
          onOpen = _this$props.onOpen,
          onClose = _this$props.onClose;

      if (_this.state.open !== open) {
        _this.setState({
          open: open
        }, callback);

        var event = {
          open: open
        };

        if (open) {
          onOpen(event);
        } else {
          onClose(event);
        }
      }
    });

    defineProperty(assertThisInitialized(_this), "onPanelChange", function (value) {
      _this.setValue(value);
    });

    defineProperty(assertThisInitialized(_this), "onPanelClear", function () {
      _this.setValue(null);

      _this.setOpen(false);
    });

    defineProperty(assertThisInitialized(_this), "onVisibleChange", function (open) {
      _this.setOpen(open);
    });

    defineProperty(assertThisInitialized(_this), "onEsc", function () {
      _this.setOpen(false);

      _this.picker.focus();
    });

    defineProperty(assertThisInitialized(_this), "onKeyDown", function (e) {
      if (e.keyCode === 40) {
        _this.setOpen(true);
      }
    });

    defineProperty(assertThisInitialized(_this), "setValue", function (value) {
      if (!('value' in _this.props)) {
        _this.setState({
          value: value
        });
      }

      _this.props.onChange(value);
    });

    defineProperty(assertThisInitialized(_this), "getFormat", function () {
      var format = _this.props.format;

      if (_this.props.format) {
        format = _this.props.format;
      } else if (!_this.props.showSecond) {
        format = 'HH:mm';
      } else if (!_this.props.showHour) {
        format = 'mm:ss';
      } else {
        format = 'HH:mm:ss';
      }

      if (_this.props.showAMPM) {
        format = "".concat(format.replace('HH', 'hh'), " A");
      }

      return format;
    });

    defineProperty(assertThisInitialized(_this), "getPanelElement", function () {
      var _this$props2 = _this.props,
          prefixCls = _this$props2.prefixCls,
          placeholder = _this$props2.placeholder,
          disabledHours = _this$props2.disabledHours,
          disabledMinutes = _this$props2.disabledMinutes,
          disabledSeconds = _this$props2.disabledSeconds,
          hideDisabledOptions = _this$props2.hideDisabledOptions,
          allowEmpty = _this$props2.allowEmpty,
          showHour = _this$props2.showHour,
          showSecond = _this$props2.showSecond,
          showAMPM = _this$props2.showAMPM,
          defaultOpenValue = _this$props2.defaultOpenValue,
          clearText = _this$props2.clearText,
          isGregorian = _this$props2.isGregorian;
      return React.createElement(Panel, {
        isGregorian: isGregorian,
        clearText: clearText,
        prefixCls: "".concat(prefixCls, "-panel"),
        ref: function ref(refs) {
          _this.savePanelRef = refs;
        },
        value: _this.state.value,
        onChange: _this.onPanelChange,
        onClear: _this.onPanelClear,
        defaultOpenValue: defaultOpenValue,
        showHour: showHour,
        onEsc: _this.onEsc,
        showSecond: showSecond,
        showAMPM: showAMPM,
        allowEmpty: true,
        format: _this.getFormat(),
        placeholder: placeholder,
        disabledHours: disabledHours,
        disabledMinutes: disabledMinutes,
        disabledSeconds: disabledSeconds,
        hideDisabledOptions: hideDisabledOptions
      });
    });

    _this.savePanelRef = refFn.bind(assertThisInitialized(_this), 'panelInstance');

    var _this$props3 = _this.props,
        defaultOpen = _this$props3.defaultOpen,
        defaultValue = _this$props3.defaultValue,
        _this$props3$open = _this$props3.open,
        _open = _this$props3$open === void 0 ? defaultOpen : _this$props3$open,
        _this$props3$value = _this$props3.value,
        _value = _this$props3$value === void 0 ? defaultValue : _this$props3$value;

    _this.state = {
      open: _open,
      value: _value
    };
    return _this;
  }

  createClass(Picker, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var value = nextProps.value,
          open = nextProps.open;

      if ('value' in nextProps) {
        this.setState({
          value: value
        });
      }

      if (open !== undefined) {
        this.setState({
          open: open
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          panelClassName = _this$props4.panelClassName,
          prefixCls = _this$props4.prefixCls,
          placeholder = _this$props4.placeholder,
          placement = _this$props4.placement,
          align = _this$props4.align,
          disabled = _this$props4.disabled,
          transitionName = _this$props4.transitionName,
          style = _this$props4.style,
          className = _this$props4.className,
          showHour = _this$props4.showHour,
          showSecond = _this$props4.showSecond,
          getPopupContainer = _this$props4.getPopupContainer;
      var _this$state = this.state,
          open = _this$state.open,
          value = _this$state.value;
      var popupClassName;

      if (!showHour || !showSecond) {
        popupClassName = "".concat(prefixCls, "-panel-narrow");
      }

      return React.createElement(Trigger, {
        prefixCls: "".concat(prefixCls, "-panel  ").concat(panelClassName),
        popupClassName: popupClassName,
        popup: this.getPanelElement(),
        popupAlign: align,
        builtinPlacements: placements,
        popupPlacement: placement,
        action: disabled ? [] : ['click'],
        destroyPopupOnHide: true,
        getPopupContainer: getPopupContainer,
        popupTransitionName: transitionName,
        popupVisible: open,
        onPopupVisibleChange: this.onVisibleChange
      }, React.createElement("span", {
        className: "".concat(prefixCls, " ").concat(className),
        style: style
      }, React.createElement("input", {
        className: "".concat(prefixCls, "-input"),
        ref: function ref(refs) {
          _this2.picker = refs;
        },
        type: "text",
        placeholder: placeholder,
        readOnly: true,
        onKeyDown: this.onKeyDown,
        disabled: disabled,
        value: value && value.format(this.getFormat()) || ''
      }), React.createElement("span", {
        className: "".concat(prefixCls, "-icon")
      })));
    }
  }]);

  return Picker;
}(React.Component);

defineProperty(Picker, "propTypes", {
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
});

defineProperty(Picker, "defaultProps", {
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
  disabledHours: noop$1,
  disabledMinutes: noop$1,
  disabledSeconds: noop$1,
  hideDisabledOptions: false,
  placement: 'bottomLeft',
  onChange: noop$1,
  onOpen: noop$1,
  onClose: noop$1
});

var disabledMinutes = function disabledMinutes() {
  return toConsumableArray(Array(60)).map(function (v, i) {
    return i;
  }).filter(function (v) {
    return v % 5 !== 0;
  });
};

var MyTimePicker =
/*#__PURE__*/
function (_Component) {
  inherits(MyTimePicker, _Component);

  function MyTimePicker() {
    classCallCheck(this, MyTimePicker);

    return possibleConstructorReturn(this, getPrototypeOf(MyTimePicker).apply(this, arguments));
  }

  createClass(MyTimePicker, [{
    key: "handleChange",
    value: function handleChange(value) {
      var _this$props = this.props,
          momentValue = _this$props.momentValue,
          min = _this$props.min;
      var newValue;

      if (momentValue) {
        newValue = momentValue.clone();
      } else if (min && min.isAfter(momentJalaali())) {
        newValue = min.clone();
      } else {
        newValue = momentJalaali(value);
      }

      newValue.hour(value ? value.hour() : null);
      newValue.minute(value ? value.minute() : null);
      this.props.setMomentValue(newValue);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          momentValue = _this$props2.momentValue,
          isGregorian = _this$props2.isGregorian,
          outsideClickIgnoreClass = _this$props2.outsideClickIgnoreClass;
      return React.createElement(Picker, {
        showAMPM: true,
        isGregorian: isGregorian,
        showSecond: false,
        allowEmpty: false,
        value: momentValue,
        className: outsideClickIgnoreClass,
        popupClassName: outsideClickIgnoreClass,
        panelClassName: "".concat(outsideClickIgnoreClass, " time-picker-panel"),
        onChange: this.handleChange.bind(this),
        disabledMinutes: disabledMinutes,
        formatter: function formatter(value) {
          return persianNumber(value);
        },
        hideDisabledOptions: true
      });
    }
  }]);

  return MyTimePicker;
}(Component);

defineProperty(MyTimePicker, "propTypes", {
  momentValue: PropTypes.object,
  setMomentValue: PropTypes.func,
  isGregorian: PropTypes.bool
});

defineProperty(MyTimePicker, "defaultProps", {
  momentValue: momentJalaali()
});

var _defineProperty2;
var outsideClickIgnoreClass = 'ignore--click--outside';

var DatePicker =
/*#__PURE__*/
function (_Component) {
  inherits(DatePicker, _Component);

  function DatePicker(props) {
    var _this;

    classCallCheck(this, DatePicker);

    _this = possibleConstructorReturn(this, getPrototypeOf(DatePicker).call(this, props)); // create a ref to store the textInput DOM element

    defineProperty(assertThisInitialized(_this), "setOpen", function (isOpen) {
      _this.setState({
        isOpen: isOpen
      });

      if (_this.props.onOpen) {
        _this.props.onOpen(isOpen);
      }
    });

    defineProperty(assertThisInitialized(_this), "handleFocus", function () {
      _this.setOpen(true);
    });

    defineProperty(assertThisInitialized(_this), "renderInput", function (ref) {
      var _this$state = _this.state,
          isOpen = _this$state.isOpen,
          inputValue = _this$state.inputValue,
          isGregorian = _this$state.isGregorian;
      var className = classnames(_this.props.className, defineProperty({}, outsideClickIgnoreClass, isOpen));
      return React.createElement("div", {
        ref: ref
      }, React.createElement("input", {
        placeholder: _this.props.placeholder,
        className: "datepicker-input ".concat(className),
        type: "text",
        ref: function ref(inst) {
          _this.input = inst;
        },
        onFocus: _this.handleFocus.bind(assertThisInitialized(_this)),
        onChange: _this.handleInputChange.bind(assertThisInitialized(_this)),
        onClick: _this.handleInputClick.bind(assertThisInitialized(_this)),
        value: isGregorian ? inputValue : _this.toPersianDigits(inputValue),
        readOnly: _this.props.inputReadOnly === true,
        disabled: _this.props.disabled
      }));
    });

    defineProperty(assertThisInitialized(_this), "renderCalendar", function (ref) {
      var _this$state2 = _this.state,
          momentValue = _this$state2.momentValue,
          isGregorian = _this$state2.isGregorian,
          TimePicker = _this$state2.timePickerComponent;
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          min = _this$props.min,
          max = _this$props.max,
          defaultMonth = _this$props.defaultMonth,
          styles = _this$props.styles,
          calendarContainerProps = _this$props.calendarContainerProps,
          ranges = _this$props.ranges;
      return React.createElement("div", {
        ref: ref
      }, React.createElement(Calendar$1, {
        ranges: ranges,
        min: min,
        max: max,
        selectedDay: momentValue,
        defaultMonth: defaultMonth,
        onSelect: _this.handleSelectDay.bind(assertThisInitialized(_this)),
        onClickOutside: _this.handleClickOutsideCalendar.bind(assertThisInitialized(_this)),
        outsideClickIgnoreClass: outsideClickIgnoreClass,
        styles: styles,
        containerProps: calendarContainerProps,
        isGregorian: isGregorian,
        calendarClass: _this.props.calendarClass ? _this.props.calendarClass : '',
        showToggleButton: _this.props.showToggleButton,
        toggleButtonText: _this.props.toggleButtonText,
        showTodayButton: _this.props.showTodayButton,
        timePicker: TimePicker ? React.createElement(TimePicker, {
          outsideClickIgnoreClass: outsideClickIgnoreClass,
          isGregorian: isGregorian,
          min: min,
          max: max,
          momentValue: momentValue,
          setMomentValue: _this.setMomentValue.bind(assertThisInitialized(_this))
        }) : null
      }));
    });

    _this.textInput = React.createRef();
    _this.state = {
      isOpen: false,
      momentValue: _this.props.defaultValue || null,
      inputValue: _this.getValue(_this.props.defaultValue, _this.props.isGregorian, _this.props.timePicker),
      inputJalaaliFormat: _this.props.inputJalaaliFormat || _this.getInputFormat(false, _this.props.timePicker),
      inputFormat: _this.props.inputFormat || _this.getInputFormat(true, _this.props.timePicker),
      isGregorian: _this.props.isGregorian,
      timePicker: _this.props.timePicker,
      timePickerComponent: _this.props.timePicker ? MyTimePicker : undefined
    };
    return _this;
  }

  createClass(DatePicker, [{
    key: "getInputFormat",
    value: function getInputFormat(isGregorian, timePicker) {
      if (timePicker) return isGregorian ? 'YYYY/M/D hh:mm A' : 'jYYYY/jM/jD hh:mm A';
      return isGregorian ? 'YYYY/M/D' : 'jYYYY/jM/jD';
    }
  }, {
    key: "getValue",
    value: function getValue(inputValue, isGregorian, timePicker) {
      if (!inputValue) return '';
      var inputFormat = this.state.inputFormat;
      var inputJalaaliFormat = this.state.inputJalaaliFormat;
      if (!inputFormat) inputFormat = this.getInputFormat(isGregorian, timePicker);
      if (!inputJalaaliFormat) inputJalaaliFormat = this.getInputFormat(isGregorian, timePicker);
      return isGregorian ? inputValue.locale('es').format(inputFormat) : inputValue.locale('fa').format(inputJalaaliFormat);
    }
  }, {
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      if (this.props.value) {
        this.setMomentValue(this.props.value);
      }
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if ('value' in nextProps && nextProps.value !== this.props.value) {
        this.setMomentValue(nextProps.value);
      }

      if ('isGregorian' in nextProps && nextProps.isGregorian !== this.props.isGregorian) {
        var nextPropsInputFormat = nextProps.inputFormat;
        var nextPropsInputJalaaliFormat = nextProps.inputJalaaliFormat;
        this.setState({
          isGregorian: nextProps.isGregorian,
          inputValue: this.getValue(nextProps.value, nextProps.isGregorian, nextProps.timePicker),
          inputFormat: nextPropsInputFormat || this.state.inputFormat,
          inputJalaaliFormat: nextPropsInputJalaaliFormat || this.state.inputJalaaliFormat
        });
      }

      if ('timePicker' in nextProps && nextProps.timePicker !== this.props.timePicker) {
        this.setState({
          timePicker: nextProps.timePicker,
          timePickerComponent: this.props.timePicker ? MyTimePicker : undefined
        });
      }
    }
  }, {
    key: "setMomentValue",
    value: function setMomentValue(momentValue) {
      var _this$state3 = this.state,
          inputFormat = _this$state3.inputFormat,
          isGregorian = _this$state3.isGregorian,
          timePicker = _this$state3.timePicker;

      if (this.props.onChange) {
        this.props.onChange(momentValue);
      }

      var inputValue = this.getValue(momentValue, isGregorian, timePicker);
      this.setState({
        momentValue: momentValue,
        inputValue: inputValue
      });
    }
  }, {
    key: "handleClickOutsideCalendar",
    value: function handleClickOutsideCalendar() {
      this.setOpen(false);
    }
  }, {
    key: "toEnglishDigits",
    value: function toEnglishDigits(str) {
      if (!str) return str;
      var regex1 = /[\u0660-\u0669]/g;
      var regex2 = /[\u06f0-\u06f9]/g;
      return str.replace(regex1, function (c) {
        return c.charCodeAt(0) - 0x0660;
      }).replace(regex2, function (c) {
        return c.charCodeAt(0) - 0x06f0;
      });
    }
  }, {
    key: "toPersianDigits",
    value: function toPersianDigits(str) {
      if (!str) return str;
      var regex = /[0-9]/g;
      var id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return str.replace(regex, function (w) {
        return id[+w];
      });
    }
  }, {
    key: "handleSelectDay",
    value: function handleSelectDay(selectedDay) {
      var oldValue = this.state.momentValue;
      var momentValue = selectedDay.clone();

      if (oldValue) {
        momentValue = momentValue.set({
          hour: oldValue.hours(),
          minute: oldValue.minutes(),
          second: oldValue.seconds()
        });
      }

      this.setOpen(false);
      this.setMomentValue(momentValue);
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(event) {
      var _this$state4 = this.state,
          inputFormat = _this$state4.inputFormat,
          inputJalaaliFormat = _this$state4.inputJalaaliFormat,
          isGregorian = _this$state4.isGregorian;
      var inputValue = this.toEnglishDigits(event.target.value);
      var currentInputFormat = isGregorian ? inputFormat : inputJalaaliFormat;
      var momentValue = momentJalaali(inputValue, currentInputFormat);

      if (momentValue.isValid()) {
        this.setState({
          momentValue: momentValue
        });
      }

      var isUserClearInput = inputValue === '';

      if (this.props.onChange) {
        if (isUserClearInput) {
          this.props.onChange('');
        }
      }

      this.setState({
        inputValue: inputValue
      });
    }
  }, {
    key: "handleInputClick",
    value: function handleInputClick() {
      if (!this.props.disabled) {
        this.setOpen(true);
      }
    }
  }, {
    key: "removeDate",
    value: function removeDate() {
      var onChange = this.props.onChange;

      if (onChange) {
        onChange('');
      }

      this.setState({
        input: '',
        inputValue: ''
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var isOpen = this.state.isOpen;
      return React.createElement(TetherComponent, {
        ref: function ref(tether) {
          return _this2.tether = tether;
        },
        attachment: this.props.tetherAttachment ? this.props.tetherAttachment : 'top center',
        constraints: [{
          to: 'window',
          attachment: 'together'
        }],
        offset: "-10px -10px",
        onResize: function onResize() {
          return _this2.tether && _this2.tether.position();
        }
        /* renderTarget: This is what the item will be tethered to, make sure to attach the ref */
        ,
        renderTarget: function renderTarget(ref) {
          return _this2.renderInput(ref);
        }
        /* renderElement: If present, this item will be tethered to the the component returned by renderTarget */
        ,
        renderElement: function renderElement(ref) {
          return isOpen && _this2.renderCalendar(ref);
        }
      });
    }
  }]);

  return DatePicker;
}(Component);

defineProperty(DatePicker, "propTypes", (_defineProperty2 = {
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  defaultValue: PropTypes.object,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  children: PropTypes.node,
  min: PropTypes.object,
  max: PropTypes.object,
  defaultMonth: PropTypes.object,
  inputFormat: PropTypes.string,
  inputJalaaliFormat: PropTypes.string,
  removable: PropTypes.bool,
  styles: PropTypes.object,
  calendarStyles: PropTypes.object,
  calendarContainerProps: PropTypes.object,
  isGregorian: PropTypes.bool,
  // jalaali or gregorian
  timePicker: PropTypes.bool,
  calendarClass: PropTypes.string,
  datePickerClass: PropTypes.string
}, defineProperty(_defineProperty2, "datePickerClass", PropTypes.string), defineProperty(_defineProperty2, "tetherAttachment", PropTypes.string), defineProperty(_defineProperty2, "inputReadOnly", PropTypes.bool), defineProperty(_defineProperty2, "ranges", PropTypes.array), defineProperty(_defineProperty2, "showToggleButton", PropTypes.bool), defineProperty(_defineProperty2, "toggleButtonText", PropTypes.any), defineProperty(_defineProperty2, "showTodayButton", PropTypes.bool), defineProperty(_defineProperty2, "placeholder", PropTypes.string), _defineProperty2));

defineProperty(DatePicker, "defaultProps", {
  styles: undefined,
  calendarContainerProps: {},
  isGregorian: true,
  timePicker: true,
  showTodayButton: true,
  placeholder: ''
});

momentJalaali.loadPersian({
  dialect: 'persian-modern'
});

export default DatePicker;
export { Calendar };
