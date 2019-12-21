import momentJalaali from 'moment-jalaali';

const MomentRange = require('moment-range');

const extendedMoment = MomentRange.extendMoment(momentJalaali);

export default class RangesList {
  constructor(ranges) {
    this.ranges = [];

    if (ranges) {
      ranges.forEach(item => {
        this.validateRangeObject(item);

        const range = extendedMoment.range(item.start, item.end);

        // include start
        const start = range.start.add(-1, 'days');

        this.ranges.push({ color: item.color, range, disabled: !!item.disabled });
      });
    }
  }

  getDayState(day) {
    const disabled = this.ranges.some(x => x.disabled && x.range.contains(day));

    const colors = this.ranges.filter(x => x.color && x.range.contains(day)).map(x => x.color);

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
