import React, { useState } from 'react';
import moment from 'moment-jalaali';
import DatePicker from '../../../src/components/DatePicker';

function component() {
  const [value, setValue] = useState(moment());

  return <DatePicker value={value} onChange={value => setValue(value)} />;
}

const title = 'React Hook sample';
const code = `function component() {
  const [value, setValue] = useState(0);
  setSelectedDate(moment());

  return <DatePicker 
  value={value} 
  onChange={value => setValue(value)} />;
}
`;

const ReactHook = { component, title, code };

export default ReactHook;
