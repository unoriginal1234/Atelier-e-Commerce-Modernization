//tests here
const sum = require('./sum.js')

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('two plus 3 is four', () => {
  expect(sum(2, 3)).toBe(5);
});