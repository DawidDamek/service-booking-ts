import { module, test } from 'qunit';
import { formatDate } from 'service-booking-ts/helpers/format-date';

module('Unit | Helper | format-date', function () {
  test('formats date', async function (assert) {
    const date = new Date(2022, 9, 10);

    assert.strictEqual(formatDate([date]), '10-10-2022r.');
  });
});
