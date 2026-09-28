const test = require('node:test');
const assert = require('node:assert/strict');
const { validateFeedback } = require('../feedback');
test('accepts and trims a valid submission', () => {
  assert.deepEqual(validateFeedback({ name: ' Aditya ', course: ' Data Science ', feedback: ' Great course! ' }), { name: 'Aditya', course: 'Data Science', feedback: 'Great course!' });
});
test('rejects empty fields', () => {
  assert.throws(() => validateFeedback({ name: 'Aditya', course: '', feedback: 'Good' }), /complete all three fields/);
});
test('rejects feedback over the length limit', () => {
  assert.throws(() => validateFeedback({ name: 'Aditya', course: 'Data Science', feedback: 'x'.repeat(2001) }), /length limit/);
});
