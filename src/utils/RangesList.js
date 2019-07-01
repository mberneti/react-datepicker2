import Moment from 'moment-jalaali';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export default class RangesList {
  constructor(ranges) {

    this.disabledList; // day
    this.colorList = []; // day - color

    if (ranges) {
      ranges.forEach(item => {

        this.validateRangeObject(item);

        const range = moment.range(item.start, item.end);

        if (!!item.color) {
          this.colorList.push({ color: item.color, range });
        }

        if (!!item.disabled) {
          if (!this.disabledList) {
            this.disabledList = range;
          } else {
            this.disabledList.add(range);
          }
        }

      });
    }

  }

  getDayState(day) {
    const disabled = this.disabledList && this.disabledList.contains(day);
    const colors = this.colorList.filter(x => x.range.contains(day)).map(x => x. color);

    return { disabled, colors };
  }

  validateRangeObject(range) {
    if (!('start' in range))
      throw `'start' property is a required property of 'range' object.
            range object: ${JSON.stringify(range)}`;
    if (!('end' in range))
      throw `'end' property is a required property of 'range' object.
            range object: ${JSON.stringify(range)}`;
  }


}