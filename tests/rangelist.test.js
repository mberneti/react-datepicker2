import RangesList from '../src/utils/RangesList';

function inValidStartRange() {
  new RangesList([{ end: new Date(1993, 12, 5) }]);
}

function inValidEndRange() {
  new RangesList([{ start: new Date(1993, 12, 5) }]);
}

function createMultipleRangeList() {

  const ranges = [
    {
      color: 'skyblue',
      start: new Date(1993, 12, 1),
      end: new Date(1993, 12, 10)
    },
    {
      color: 'red',
      disabled: true,
      start: new Date(1993, 12, 5),
      end: new Date(1993, 12, 15)
    }
  ];

  return new RangesList(ranges);
}

test('throw errors for invalid ranges', () => {
  expect(inValidStartRange).toThrow(/'start'/);
  expect(inValidEndRange).toThrow(/'end'/);
});

test('color ranges list items count', () => {

  const multipleRangeList = createMultipleRangeList();

  expect(multipleRangeList.ranges.filter(x => x.color).length)
    .toEqual(2);
})

test('simple highlight range', () => {

  const multipleRangeList = createMultipleRangeList();

  const skyblueDayOnly = new Date(1993, 12, 2);

  expect(multipleRangeList.getDayState(skyblueDayOnly))
    .toEqual({ disabled: false, colors: ['skyblue'] });

})

test('disable and highlight range', () => {

  const multipleRangeList = createMultipleRangeList();

  const redDisabledDayOnly = new Date(1993, 12, 15);

  expect(multipleRangeList.getDayState(redDisabledDayOnly))
    .toEqual({ disabled: true, colors: ['red'] });

})

test('highlight and disable multiple range', () => {

  const multipleRangeList = createMultipleRangeList();

  const skyblueAndRedDisabledDay = new Date(1993, 12, 10);

  expect(multipleRangeList.getDayState(skyblueAndRedDisabledDay))
    .toEqual({ disabled: true, colors: ['skyblue', 'red'] });

})