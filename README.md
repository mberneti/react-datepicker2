# React Date Picker

[![npm](https://img.shields.io/npm/v/react-datepicker2.svg)](https://www.npmjs.com/package/react-datepicker2)
[![npm](https://img.shields.io/npm/dt/react-datepicker2.svg)](https://www.npmjs.com/package/react-datepicker2)
[![Build Status](https://travis-ci.org/mberneti/react-datepicker2.svg?branch=master)](https://travis-ci.org/mberneti/react-datepicker2)
[![CircleCI](https://circleci.com/gh/mberneti/react-datepicker2.svg?style=svg)](https://circleci.com/gh/mberneti/react-datepicker2)

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

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datepicker2/dist/react-datepicker2.min.css';
```

Below is a simple example on how to use the Datepicker in a React view. You will also need to require the css file from this package (or provide your own). The example below shows how to include the css from this package if your build system supports requiring css files (webpack is one that does).

```js
import React from 'react'
import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2';

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
You can also use the standalone build by including react-datepicker2.js and react-datepicker2.css in your page. (If you do this though you'll also need to include the dependencies.) For example:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>
<script src="https://unpkg.com/classnames/index.js"></script>
<script src="https://unpkg.com/react-datepicker2/dist/index.js"></script>

<link rel="stylesheet" href="https://unpkg.com/react-datepicker2/dist/react-datepicker2.min.css">
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
- [x] Better documentation
- [ ] UI improvements
- [ ] Remove classnames dependency

## Built With

* [moment-jalaali](https://github.com/jalaali/moment-jalaali) - A Jalaali (Jalali, Persian, Khorshidi, Shamsi) calendar system plugin for moment.js.

## Thanks
Special thanks to [@mohebifar](https://github.com/mohebifar) for his open-source project which this component is based on.

## Contributing
Contributions are **welcome** and will be fully **credited**.
I'd be happy to accept PRs for that.

## License

Copyright (c) 2016 [mberneti](https://twitter.com/mberneti) Inc. and individual contributors. Licensed under MIT license, see [LICENSE](LICENSE) for the full license.
