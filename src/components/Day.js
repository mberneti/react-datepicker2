import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { persianNumber } from '../utils/persian';

const styles = {
  wrapper: {},
  button: {
    outline: 'none',
    cursor: 'pointer'
  }
};

export default class Day extends Component {
  static propTypes = {
    day: PropTypes.object.isRequired,
    isCurrentMonth: PropTypes.bool,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    hovered: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    isGregorian: PropTypes.bool
  };

  state = {
      hovered : this.props.hovered ? this.props.hovered : false,
  };
  shouldComponentUpdate(nextProps) {
    return nextProps.selected !== this.props.selected ||
      nextProps.disabled !== this.props.disabled ||
      nextProps.isCurrentMonth !== this.props.isCurrentMonth ||
      nextProps.hovered !== this.props.hovered;
  }

  handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const { onClick, day } = this.props;

    if (onClick) {
      onClick(day);
    }
  }

    handleMouseOverOnDay(event) {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        const {onMouseOver, day} = this.props;
        if (onMouseOver) {
            onMouseOver(day);
        }
    }
  render() {
    const { day, disabled, selected, isCurrentMonth, onClick, styles , hovered ,isGregorian, ...rest } = this.props;

    const className = classnames(styles.dayWrapper, {
      [styles.selected]: selected,
      [styles.currentMonth]: isCurrentMonth
    });

    return (
      <div className={className}>
        <button
          type="button"
          disabled={disabled}
          {...rest}
          onClick={this.handleClick.bind(this) }
          onMouseOver={this.handleMouseOverOnDay.bind(this) }
          style={hovered ? {backgroundColor: "#eeeeff"} : {}}
        >
          { isGregorian?day.format('D'):persianNumber(day.format('jD')) }
        </button>
      </div>
    );
  }
}
