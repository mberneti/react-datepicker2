import React from 'react';
import hljs from 'highlight.js';
import CodeExampleComponent from './code_example_component';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import Default from './examples/default';
import Jalaali from './examples/jalaali';
import HideTodayButton from './examples/HideTodayButton';
import DisabledTimepicker from './examples/disabledTimepicker';
import SwitchIsGregorian from './examples/switchIsGregorian';
import CalendarPicker from './examples/calendarPicker';
import LimitWithMinMax from './examples/limitWithMinMax';
import DisabledRange from './examples/disabledRange';
import HighlightRange from './examples/HighlightRange';
import Disabled from './examples/Disabled';
import ReactHook from './examples/ReactHook';
import RemoveDate from './examples/RemoveDate';
import Placeholder from './examples/Placeholder';
import ToggleButton from './examples/ToggleButton';
import OnInputChange from './examples/OnInputChange';
import JalaaliWithEnglishDigit from './examples/JalaaliWithEnglishDigit';
import SetTodayOnBlur from './examples/SetTodayOnBlur';

import { StickyContainer, Sticky } from 'react-sticky';

export default class ExampleComponents extends React.Component {
  constructor(props) {
    super(props);
    this.examples = [
      Default,
      Jalaali,
      HideTodayButton,
      DisabledTimepicker,
      SwitchIsGregorian,
      CalendarPicker,
      LimitWithMinMax,
      DisabledRange,
      HighlightRange,
      Disabled,
      ReactHook,
      RemoveDate,
      Placeholder,
      ToggleButton,
      OnInputChange,
      JalaaliWithEnglishDigit,
      SetTodayOnBlur
    ];
  }

  componentDidMount() {
    hljs.initHighlightingOnLoad();
  }

  renderExamples() {
    return this.examples.map((example, index) => (
      <CodeExampleComponent key={`example-${index}`} id={index} title={example.title}>
        <div className="row">
          <div className="column">
            {/* <Highlight lang="jsx" value={example.code} /> */}
            <SyntaxHighlighter lang="javascript" style={docco}>

            {example.code}
            </SyntaxHighlighter>
          </div>
          <div className="column">{<example.component />}</div>
        </div>
      </CodeExampleComponent>
    ));
  }

  renderLeftColumn() {
    return this.examples.map((example, index) => (
      <li className="examples__navigation-item" key={`link-${index}`}>
        <a href={`#example-${index}`}>{example.title}</a>
      </li>
    ));
  }

  render() {
    return (
      <div>
        <StickyContainer>
          <Sticky>
            {({ style, isSticky }) => {
              const border = isSticky ? { border: 'none' } : {};
              return <h1 style={{ ...style, ...border }}>Examples</h1>;
            }}
          </Sticky>
          <div className="examples__navigation-container">
            <Sticky>
              {({ style }) => (
                <ul style={style} className="examples__navigation">
                  {this.renderLeftColumn()}
                </ul>
              )}
            </Sticky>
          </div>
          <div className="examples">{this.renderExamples()}</div>
        </StickyContainer>
      </div>
    );
  }
}
