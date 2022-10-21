import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
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

    const model = {
      bikes: this.store.findAll('bike'),
      owners: this.store.findAll('user'),
      issues: this.store.findAll('issue'),
      orders: this.store.findAll('order'),
      comments: this.store.findAll('comment'),
    };
    this.set('model', model);

    await render(hbs`<FindOrder @model={{this.model}}/>`);
  });
});
