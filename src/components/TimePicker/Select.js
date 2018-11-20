import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import classnames from 'classnames';

const scrollTo = (element, to, duration) => {
  const requestAnimationFrame = window.requestAnimationFrame ||
    function requestAnimationFrameTimeout() {
      return setTimeout(arguments[0], 10);
    };
  // jump to target if duration zero
  if (duration <= 0) {
    element.scrollTop = to;
    return;
  }
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 10;

  requestAnimationFrame(() => {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  });
};

class Select extends React.Component{
  static propTypes = {
    prefixCls: PropTypes.string,
    options: PropTypes.array,
    selectedIndex: PropTypes.number,
    type: PropTypes.string,
    onSelect: PropTypes.func,
    onMouseEnter: PropTypes.func,
  }

  componentDidMount() {
    // jump to selected option
    this.scrollToSelected(0);
  }

  componentDidUpdate(prevProps) {
    // smooth scroll to selected option
    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      this.scrollToSelected(120);
    }
  }

  onSelect(value) {
    const { onSelect, type } = this.props;
    onSelect(type, value);
  }

  getOptions() {
    const { options, selectedIndex, prefixCls } = this.props;
    return options.map((item, index) => {
      const cls = classnames({
        [`${prefixCls}-select-option-selected`]: selectedIndex === index,
        [`${prefixCls}-select-option-disabled`]: item.disabled,
      });
      let onclick = null;
      if (!item.disabled) {
        let value = +item.value;
        if (Number.isNaN(value)) {
          value = item.value;
        }
        onclick = this.onSelect.bind(this, value);
      }

      return (<li
        className={cls}
        key={index}
        onClick={onclick}
        disabled={item.disabled}
      >
        {typeof item.label !== 'undefined' ? item.label : item.value}
      </li>);
    });
  }

  scrollToSelected(duration) {
    // move to selected item
    const select = ReactDom.findDOMNode(this);
    const list = ReactDom.findDOMNode(this.refs.list);
    let index = this.props.selectedIndex;
    if (index < 0) {
      index = 0;
    }
    const topOption = list.children[index];
    const to = topOption.offsetTop;
    scrollTo(select, to, duration);
  }

  render() {
    if (this.props.options.length === 0) {
      return null;
    }

    const { prefixCls } = this.props;

    return (
      <div
        className={`${prefixCls}-select`}
        onMouseEnter={this.props.onMouseEnter}
      >
        <ul ref="list">{this.getOptions()}</ul>
      </div>
    );
  }
}

export default Select;
