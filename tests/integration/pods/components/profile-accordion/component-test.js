import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('integration | Component | ProfileAccorion', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('It renders correctly', async function (assert) {
    const store = this.owner.lookup('service:store');
    this.set('store', store);
    this.sessionService = this.owner.lookup('service:session');

    const user = {
      id: 1,
      name: 'Dawid',
      surname: 'Admin',
      username: 'DD',
      email: 'dawid@admin.com',
      phoneNumber: '666666666',
      password: 'dd123',
    };

    this.server.create('user', user);
    const userModel = await this.store.findRecord('user', user.id);
    this.set('sessionService.currentUser', userModel);

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

    this.set('user', userModel);

    await render(
      hbs`<ProfileAccordion @user={{this.sessionService.currentUser}}/>`
    );

    const userProperties = Object.keys(user).slice(1);

    userProperties.map((selector) => {
      return assert
        .dom(`[data-test-user="${selector}"] input`)
        .hasValue(userModel[selector], `Displays correct user ${selector}`);
    });

    await click(`[data-test-user="name"] [data-test-button-edit] `);
    await fillIn(`[data-test-user="name"] input`, `test name rollback`);
    await click(`[data-test-user="name"] [data-test-button-cancel] `);
    assert
      .dom(`[data-test-user="name"] input`)
      .hasValue(`${user.name}`, `Displays correct user name after cancel edit`);

    const promisesArr = userProperties.map(async (selector) => {
      await click(`[data-test-user="${selector}"] [data-test-button-edit] `);
      await fillIn(`[data-test-user="${selector}"] input`, `test ${selector}`);
      await click(`[data-test-user="${selector}"] [data-test-button-save] `);
      return assert
        .dom(`[data-test-user="${selector}"] input`)
        .hasValue(
          `test ${selector}`,
          `Displays correct user ${selector} after edit`
        );
    });

    await Promise.all(promisesArr);
  });
});
