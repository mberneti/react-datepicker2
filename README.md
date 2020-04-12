# React DatePicker2
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://mehralian.org"><img src="https://avatars0.githubusercontent.com/u/13819774?v=4" width="100px;" alt=""/><br /><sub><b>Mehrdad Mehralian</b></sub></a><br /><a href="https://github.com/mberneti/react-datepicker2/commits?author=dadwic" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/shayegh"><img src="https://avatars1.githubusercontent.com/u/10929932?v=4" width="100px;" alt=""/><br /><sub><b>mojtaba Shayegh</b></sub></a><br /><a href="https://github.com/mberneti/react-datepicker2/issues?q=author%3Ashayegh" title="Bug reports">🐛</a> <a href="https://github.com/mberneti/react-datepicker2/commits?author=shayegh" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/moryrasb"><img src="https://avatars1.githubusercontent.com/u/15072825?v=4" width="100px;" alt=""/><br /><sub><b>mory rezaee</b></sub></a><br /><a href="#maintenance-moryrasb" title="Maintenance">🚧</a> <a href="https://github.com/mberneti/react-datepicker2/commits?author=moryrasb" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!