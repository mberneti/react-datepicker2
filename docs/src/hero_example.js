import React from 'react';
import momentJalaali from 'moment-jalaali';
import DatePicker from '../../src/index.dev.js';

import Switch from 'react-switch';

const buttonContainerStyle = {
  marginTop: 20
};
const labelStyle = {
  float: 'left'
};
const switchStyle = {
  float: 'right'
};

export default class ReactClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: momentJalaali(), checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <DatePicker
            timePicker={false}
            isGregorian={this.state.checked}
            onChange={value => {
              this.setState({ value });
              console.log(value);
            }}
            value={this.state.value}
          />
        </div>
        <div style={buttonContainerStyle}>
          <label htmlFor="material-switch">
            <span style={labelStyle}>isGregorian:{this.state.checked ? 'true' : 'false'}</span>
            <div style={switchStyle}>
              <Switch
                checked={this.state.checked}
                onChange={this.handleChange}
                onColor="#86ffa8"
                onHandleColor="#25e679"
                handleDiameter={23}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={15}
                width={38}
                className="react-switch"
                id="material-switch"
              />
            </div>
          </label>
        </div>
      </React.Fragment>
    );
  }
}
