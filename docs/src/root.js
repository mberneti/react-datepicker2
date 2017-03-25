import React from 'react'
import ExampleComponents from './example_components.js'
import HeroExample from './hero_example.js'

export default React.createClass({
  displayName: 'Root',

  render () {
    return (
      <div>
        <div className="hero">
          <div className="hero__content">
            <h1 className="hero__title">
              ReactJS Datepicker2
            </h1>
            <div className="hero__crafted-by">
              <a href="https://berneti.ir" className="hero__crafted-by-link">
                Crafted by <h3 className="logo">mberneti</h3>
              </a>
            </div>
            <div className="hero__example">
              <HeroExample />
            </div>
          </div>
        </div>
        <div className="wrapper">
          <h1>ReactJS Datepicker2</h1>
          <p>A simple and reusable datepicker component for React. (with persian jalaali calendar)</p>

          <h2>Installation</h2>
          <p>The package can be installed via NPM:</p>
          <p><code>npm install react-datepicker2 --save</code></p>
        </div>
        <div className="wrapper">
          <ExampleComponents />
        </div>

        <a href="https://github.com/mberneti/react-datepicker2/">
          <img className="github-ribbon" src="https://mberneti.github.io/react-datepicker2/images/ribbon.png" alt="Fork me on GitHub" />
        </a>
      </div>
    )
  }
})
