import './styles/style.scss';
import moment from 'moment-jalaali';
import DatePicker from './components/DatePicker';

moment.loadPersian({ dialect: 'persian-modern' });
export { Calendar } from './components/Calendar';
export default DatePicker;
