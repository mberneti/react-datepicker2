# React DatePicker2

[![npm](https://img.shields.io/npm/v/react-datepicker2.svg)](https://www.npmjs.com/package/react-datepicker2)
[![npm](https://img.shields.io/npm/dt/react-datepicker2.svg)](https://www.npmjs.com/package/react-datepicker2)
[![Build Status](https://travis-ci.org/mberneti/react-datepicker2.svg?branch=master)](https://travis-ci.org/mberneti/react-datepicker2)
[![Dependency Status](https://david-dm.org/mberneti/react-datepicker2.svg)](https://david-dm.org/mberneti/react-datepicker2)

A simple and reusable Datepicker component for React (with persian jalali calendar support) [Demo](https://mberneti.github.io/react-datepicker2/).

![](https://mberneti.github.io/react-datepicker2/images/react-datepicker2.gif)

This package uses [react-persian-datepicker](https://github.com/evandhq/react-persian-datepicker) project under the hood.

## Installation

The package can be installed via NPM:

```
npm install react-datepicker2 --save
```

At this point you can import react-datepicker2 and its styles in your application as follows:

```js
import DatePicker from 'react-datepicker2';
```

Below is a simple example on how to use the Datepicker in a React view.

```js
import React from 'react'
import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2';

export default class ReactClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: moment() };
  }
  render() {
    return <DatePicker
      onChange={value => this.setState({ value })}
      value={this.state.value}
    />
  }
}
```

## Configuration

The most basic use of the DatePicker can be described with:

```js
<DatePicker onChange={value => this.setState({ value })} value={this.state.value} />
```

## Local Development

The `master` branch contains the latest version of the Datepicker2 component. To start your example app, you can run `npm install` then `npm start`. This starts a simple webserver on http://localhost:8080.

## Todo

- [x] Write some tests
- [x] Improve documentation
- [x] Remove css loading dependency
- [x] UI improvements
- [x] Adding new highlight feature
- [ ] Adding new rangepicker feature

## Built With

* [moment-jalaali](https://github.com/jalaali/moment-jalaali) - A Jalaali (Jalali, Persian, Khorshidi, Shamsi) calendar system plugin for moment.js.

## Thanks
Special thanks to [@mohebifar](https://github.com/mohebifar) for his open-source project which this component is based on.

## Contributing
Contributions are **welcome** and will be fully **credited**.
I'd be happy to accept PRs for that.

## License

Copyright (c) 2016 [mberneti](https://twitter.com/mberneti) Inc. and individual contributors. Licensed under MIT license, see [LICENSE](LICENSE) for the full license.
