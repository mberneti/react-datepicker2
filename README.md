# React Date Picker

A simple and reusable Datepicker component for React (with persian jalali calendar support) [Demo](https://mberneti.github.io/react-datepicker2/).

This package uses [react-persian-datepicker](https://github.com/evandhq/react-persian-datepicker) project under the hood.

## Installation

The package can be installed via NPM:

```
npm install react-datepicker2 --save
```

At this point you can import react-datepicker2 and its styles in your application as follows:

```js
import Datepicker from 'react-datepicker2';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datepicker2/dist/react-datepicker2.min.css';
```

Below is a simple example on how to use the Datepicker in a React view. You will also need to require the css file from this package (or provide your own). The example below shows how to include the css from this package if your build system supports requiring css files (webpack is one that does).

```js
import React from 'react'
import moment from 'moment-jalaali'
import DatePicker from 'react-datePicker2';

import 'react-datepicker2/dist/react-datepicker2.min.css';

export default React.createClass({
  getInitialState() {
    return {
      value: moment()
    }
  },
  render() {
    return <DatePicker
      onChange={value => this.setState({ value })}
      value={this.state.value}
    />
  }
})

```

## Configuration

The most basic use of the DatePicker can be described with:

```js
<DatePicker onChange={value => this.setState({ value })} value={this.state.value} />
```

## Local Development

The `master` branch contains the latest version of the Datepicker2 component. To start your example app, you can run `npm install` then `npm start`. This starts a simple webserver on http://localhost:8080.

## Todo

- [ ] Write tests
- [ ] Better documentation
- [ ] UI improvements

## Built With

* [moment-jalaali](https://github.com/jalaali/moment-jalaali) - A Jalaali (Jalali, Persian, Khorshidi, Shamsi) calendar system plugin for moment.js.

## Thanks
Special thanks to [@mohebifar](https://github.com/mohebifar) for his open-source project which this component is based on.

## Contributing
Contributions are **welcome** and will be fully **credited**.
I'd be happy to accept PRs for that.

## License

Copyright (c) 2016 HackerOne Inc. and individual contributors. Licensed under MIT license, see [LICENSE](LICENSE) for the full license.
