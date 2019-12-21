import './styles/style.scss';
import momentJalaali from 'moment-jalaali';
import DatePicker from './components/DatePicker';

momentJalaali.loadPersian({ dialect: 'persian-modern' });
export { Calendar } from './components/Calendar';
export default DatePicker;
