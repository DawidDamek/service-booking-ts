import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('integration | Component | FindOrder', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('It renders correctly', async function (assert) {
    const store = this.owner.lookup('service:store');
    this.set('store', store);

    const user = this.server.create('user', {
      name: 'DD',
      surname: 'Admin',
      isAdmin: 'true',
      email: 'dawid@admin.com',
      phoneNumber: '666666666',
    });
    const userModel = await this.store.findRecord('user', user.id);

    const bike = this.server.create('bike', {
      status: 'inProgress',
      brand: 'Giant',
      model: 'Reign SX',
      color: 'blue',
      size: 'L',
      photoUrl:
        'https://images.giant-bicycles.com/b_white,c_pad,h_600,q_80,w_800/oz2p68vsxoswiptfjxwq/MY22Reign29SX_ColorAStarryNight.jpg',
      ownerId: userModel.id,
    });
    const bikeModel = await this.store.findRecord('bike', bike.id);

    const order = this.server.create('order', {
      type: 'Service',
      status: 'New',
      acceptanceDate: new Date(2022, 10, 10),
      releaseDate: new Date(2022, 10, 15),
      ownerId: userModel.id,
      bikeId: bikeModel.id,
    });
    const orderModel = await this.store.findRecord('order', order.id);

    this.server.create('comment', {
      content: 'test comment content 1',
      orderId: orderModel.id,
      ownerId: userModel.id,
    });
    this.server.create('comment', {
      content: 'test comment content 2',
      orderId: orderModel.id,
      ownerId: userModel.id,
    });

    this.server.create('issue', {
      details: 'issue content 1',
      status: 'toDo',
      bikeId: bike.id,
      orderId: order.id,
    });
    this.server.create('issue', {
      details: 'issue content 2',
      status: 'toDo',
      bikeId: bike.id,
      orderId: order.id,
    });
    this.server.create('issue', {
      details: 'issue content 3',
      status: 'toDo',
      bikeId: bike.id,
      orderId: order.id,
    });

    const model = {
      bikes: this.store.findAll('bike'),
      owners: this.store.findAll('user'),
      issues: this.store.findAll('issue'),
      orders: this.store.findAll('order'),
      comments: this.store.findAll('comment'),
    };
    this.set('model', model);

    await render(hbs`<FindOrder @model={{this.model}}/>`);

    await fillIn('[data-test-input-order]', '1');

    await click('[data-test-button-check]');

    assert
      .dom('[data-test-owner-fullname]')
      .hasText(
        `${userModel.name} ${userModel.surname}`,
        'Displays correct name and surname'
      );

    assert
      .dom('[data-test-bike-fullname]')
      .hasText(
        `Bike: ${bike.brand} ${bike.model}`,
        'Displays correct brand and model of bike'
      );

    assert
      .dom('[data-test-date-acceptance]')
      .hasText(
        `Acceptance date: 10-11-2022r.`,
        'Displays correct acceptance date'
      );
    assert
      .dom('[data-test-date-release]')
      .hasText(
        `Aproximated release date: 15-11-2022r.`,
        'Displays correct release date'
      );

    assert
      .dom('[data-test-issue]')
      .exists({ count: 3 }, 'Displays correct number of issues');

    Array(this.model.issues.length)
      .fill('data-test-issue')
      .map((selector, index) => {
        return assert
          .dom(`[${selector}="${index}"]`)
          .hasText(
            `issue content ${index + 1} toDo`,
            `Issue no.${index + 1} displays correct text`
          );
      });

    assert
      .dom('[data-test-comment-display]')
      .exists({ count: 2 }, 'Displays correct ammount of comments');

    Array(2)
      .fill('data-test-comment-display')
      .map((selector, index) => {
        return assert
          .dom(`[${selector}="${index}"] input`)
          .hasValue(
            `test comment content ${index + 1}`,
            `Comment no.${index + 1} displays correct text`
          );
      });

    await click(
      '[data-test-comment-display="0"] [data-test-button-deletecomment]'
    );

    assert
      .dom('[data-test-comment-display]')
      .exists(
        { count: 1 },
        'Displays correct ammount of comments after deleting one of them'
      );

    assert
      .dom('[data-test-comment-display="0"]')
      .exists('Correct comment was deleted');

    await click('[data-test-button-addcomment]');
    assert
      .dom('[data-test-button-submit]')
      .hasAttribute(
        'disabled',
        '',
        'Submit comment button is disabled before input'
      );

    await click('[data-test-button-cancel]');
    assert
      .dom('[data-test-addcomment-form]')
      .doesNotExist('After cancel comment input disapears');

    await click(`[data-test-button-addcomment]`),
      await fillIn('[data-test-addcomment-form] input', `Test input content 1`),
      await click('[data-test-button-submit]');

    await click(`[data-test-button-addcomment]`),
      await fillIn('[data-test-addcomment-form] input', `Test input content 2`),
      await click('[data-test-button-submit]');

    await click(`[data-test-button-addcomment]`),
      await fillIn('[data-test-addcomment-form] input', `Test input content 3`),
      await click('[data-test-button-submit]');

    assert
      .dom('[data-test-comment-display]')
      .exists(
        { count: 4 },
        'Displays correct ammount of comments after adding new comments'
      );

    await click('[data-test-button-cancel]');
    assert
      .dom('[data-test-input-order]')
      .hasNoValue('Cancel find order clears ID input');
  });
});
