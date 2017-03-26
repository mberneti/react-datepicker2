import React from 'react'
import hljs from 'highlight.js'
import CodeExampleComponent from './code_example_component'
import Highlight from 'react-syntax-highlight';

import Default from './examples/default'
import Jalaali from './examples/jalaali'
import DisabledTimepicker from './examples/disabledTimepicker'
import SwitchIsGregorian from './examples/switchIsGregorian'

export default React.createClass({
  displayName: 'exampleComponents',

  componentDidMount() {
    hljs.initHighlightingOnLoad()
  },

  examples: [Default, Jalaali, DisabledTimepicker, SwitchIsGregorian],

  renderExamples() {
    return this.examples.map((example, index) =>
      <CodeExampleComponent key={`example-${index}`} id={index} title={example.title}>
        <div className="row">
          <div className="column">
            <Highlight lang="jsx" value={example.code} />
          </div>
          <div className="column">
            {<example.component />}
          </div>
        </div>
      </CodeExampleComponent>
    )
  },

  renderLeftColumn() {
    return this.examples.map((example, index) =>
      <li className="examples__navigation-item" key={`link-${index}`}>
        <a href={`#example-${index}`}>
          {example.title}
        </a>
      </li>
    )
  },

  render() {
    return <div>
      <h1>Examples</h1>
      {Default.component}
      <ul className="examples__navigation">
        {this.renderLeftColumn()}
      </ul>
      <div className="examples">
        {this.renderExamples()}
      </div>
    </div>
  }
})
