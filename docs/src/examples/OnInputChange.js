import React from 'react';
import momentJalaali from 'moment-jalaali';
import DatePicker from '../../../src/components/DatePicker';

class component extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onChangeValue: momentJalaali(),
      onInputChangeValue: '',
      onChangeLastUpdate: new Date(),
      onInputChangeLastUpdate: new Date()
    };
  }

  dateToString = date => `${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;

  render() {
    const {
      onChangeValue,
      onInputChangeValue,
      onChangeLastUpdate,
      onInputChangeLastUpdate
    } = this.state;

    return (
      <React.Fragment>
        <div>
          <label>OnChange:</label>
          <p>{onChangeValue.format('YYYY/M/D hh:mm A')}</p>
          <label>OnChange Last Update:</label>
          <p>{this.dateToString(onChangeLastUpdate)}</p>
        </div>
        <div>
          <label>OnInputChange:</label>
          <p>{onInputChangeValue}</p>
          <label>OnInputChange Last Update:</label>
          <p>{this.dateToString(onInputChangeLastUpdate)}</p>
        </div>
        <DatePicker
          value={this.state.onChangeValue}
          onChange={onChangeValue =>
            this.setState({
              onChangeValue: onChangeValue,
              onChangeLastUpdate: new Date()
            })
          }
          onInputChange={e =>
            this.setState({
              onInputChangeValue: e.target.value,
              onInputChangeLastUpdate: new Date()
            })
          }
        />
      </React.Fragment>
    );
  }
}

const title = 'OnInputChange';
const code =
  `class component extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onChangeValue: momentJalaali(),
      onInputChangeValue: '',
      onChangeLastUpdate: new Date(),
      onInputChangeLastUpdate: new Date()
    };
  }

  dateToString = date => ` +
  '`${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;' +
  `

  render() {
    const {
      onChangeValue,
      onInputChangeValue,
      onChangeLastUpdate,
      onInputChangeLastUpdate
    } = this.state;

    return (
      <React.Fragment>
        <div>
          <label>OnChange:</label>
          <p>{onChangeValue.format('YYYY/M/D hh:mm A')}</p>
          <label>OnChange Last Update:</label>
          <p>{this.dateToString(onChangeLastUpdate)}</p>
        </div>
        <div>
          <label>OnInputChange:</label>
          <p>{onInputChangeValue}</p>
          <label>OnInputChange Last Update:</label>
          <p>{this.dateToString(onInputChangeLastUpdate)}</p>
        </div>
        <DatePicker
          value={this.state.onChangeValue}
          onChange={onChangeValue =>
            this.setState({
              onChangeValue: onChangeValue,
              onChangeLastUpdate: new Date()
            })
          }
          onInputChange={e =>
            this.setState({
              onInputChangeValue: e.target.value,
              onInputChangeLastUpdate: new Date()
            })
          }
        />
      </React.Fragment>
    );
  }
}
`;
const Default = { component, title, code };

export default Default;
