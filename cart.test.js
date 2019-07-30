const sum = require('./database/db.js');

test('successfully add item to data base', () => {
  expect(Kitten({ name: 'Silence' }).name).toBe('Silence');
});

