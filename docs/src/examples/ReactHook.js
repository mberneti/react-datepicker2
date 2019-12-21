import React, { useState } from 'react';
import momentJalaali from 'moment-jalaali';
import DatePicker from '../../../src/components/DatePicker';

function component() {
  const [value, setValue] = useState(momentJalaali());

  return <DatePicker value={value} onChange={value => setValue(value)} />;
}

const title = 'React Hook sample';
const code = `function component() {
  const [value, setValue] = useState(0);
  setSelectedDate(momentJalaali());

  return <DatePicker 
  value={value} 
  onChange={value => setValue(value)} />;
}
`;

const ReactHook = { component, title, code };

export default ReactHook;
