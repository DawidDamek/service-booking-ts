import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, fillIn, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('integration | Component | Bike::List', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('It renders correctly', async function (assert) {
    const bikes = [
      {
        status: 'inProgress',
        brand: 'Giant',
        model: 'Reign SX',
        color: 'blue',
        size: 'L',
        photoUrl:
          'https://images.giant-bicycles.com/b_white,c_pad,h_600,q_80,w_800/oz2p68vsxoswiptfjxwq/MY22Reign29SX_ColorAStarryNight.jpg',
      },
      {
        status: 'inProgress',
        brand: 'Giant',
        model: 'Reign SX',
        color: 'blue',
        size: 'L',
        photoUrl:
          'https://images.giant-bicycles.com/b_white,c_pad,h_600,q_80,w_800/oz2p68vsxoswiptfjxwq/MY22Reign29SX_ColorAStarryNight.jpg',
      },
      {
        status: 'inProgress',
        brand: 'Giant',
        model: 'Reign SX',
        color: 'blue',
        size: 'L',
        photoUrl:
          'https://images.giant-bicycles.com/b_white,c_pad,h_600,q_80,w_800/oz2p68vsxoswiptfjxwq/MY22Reign29SX_ColorAStarryNight.jpg',
      },
    ];
    this.set('bikes', bikes);

    await render(hbs`<Bike::List @bikes={{this.bikes}} />`);

    Array(this.bikes.length)
      .fill('data-test-bike-item')
      .map((selector, index) => {
        return assert
          .dom(`[${selector}="${index}"]`)
          .exists(`item ${index + 1} of ${this.bikes.length} exists`);
      });
  });

  test('It renders correct data', async function (assert) {
    const bikes = [
      {
        status: 'inProgress',
        brand: 'Giant',
        model: 'Reign SX',
        color: 'blue',
        size: 'L',
        description: 'test description',
        photoUrl:
          'https://images.giant-bicycles.com/b_white,c_pad,h_600,q_80,w_800/oz2p68vsxoswiptfjxwq/MY22Reign29SX_ColorAStarryNight.jpg',
      },
      {
        status: 'delivered',
        brand: 'YT',
        model: 'Capra',
        color: 'yellow',
        size: 'M',
        photoUrl:
          'https://static.privatesportshop.com/img/p/2811042-8618188-thickbox.jpg',
      },
    ];

    this.set('bikes', bikes);
    const [first] = this.bikes;
    await render(hbs`<Bike::List @bikes={{this.bikes}} />`);

    assert.dom('[data-test-bike-image]').hasAttribute('src', first.photoUrl);
    assert
      .dom('[data-test-bike-fullName]')
      .hasText(`${first.brand} ${first.model}`);
    assert.dom('[data-test-bike-color]').hasText(`Color: ${first.color}`);
    assert.dom('[data-test-bike-size]').hasText(`Size: ${first.size}`);
    assert
      .dom('[data-test-bike-description]')
      .hasText(`Description: ${first.description}`);
    assert.dom('[data-test-bike-editButton]').exists();
    assert.dom('[data-test-bike-deleteButton]').exists();
  });

  test('Edit bike in modal', async function (assert) {
    const store = await this.owner.lookup('service:store');
    this.set('store', store);

    await this.server.createList('bike', 2);
    const bikeModels = this.store.findAll('bike');

    this.set('bikes', bikeModels);
    await render(hbs`<Bike::List @bikes={{this.bikes}} />`);

    const testBikeParams = {
      brand: 'testBrand',
      model: 'testModel',
      color: 'testColor',
      size: 'testSize',
      description: 'test description',
      photoUrl:
        'https://static.privatesportshop.com/img/p/2811042-8618188-thickbox.jpg',
    };

    assert
      .dom('[data-test-bike-item]')
      .exists({ count: 2 }, 'Rendering correct ammount of bikes');

    const formInputs = Object.keys(testBikeParams);

    await waitFor('[data-test-bike-editButton="0"]');
    await click('[data-test-bike-editButton="0"]');

    Array(formInputs.length)
      .fill('data-test-input-')
      .map(async (selector, index) => {
        return await fillIn(
          `[${selector}${formInputs[index]}]`,
          testBikeParams[formInputs[index]]
        );
      });

    await click('[data-test-save-edit-button]');

    assert
      .dom('[data-test-bike-item="0"] [data-test-bike-fullName]')
      .hasText(
        `${testBikeParams.brand} ${testBikeParams.model}`,
        'Displays correct fullname after edit'
      );
    assert
      .dom('[data-test-bike-item="0"] [data-test-bike-color]')
      .hasText(
        `Color: ${testBikeParams.color}`,
        'Displays correct color after edit'
      );
    assert
      .dom('[data-test-bike-item="0"] [data-test-bike-size]')
      .hasText(
        `Size: ${testBikeParams.size}`,
        'Displays correct size after edit'
      );
    assert
      .dom('[data-test-bike-item="0"] [data-test-bike-description]')
      .hasText(
        `Description: ${testBikeParams.description}`,
        'Displays correct description after edit'
      );

    await click('[data-test-bike-deletebutton="1"]');
    assert
      .dom('[data-test-bike-item]')
      .exists({ count: 1 }, 'After Deleting bike only one of them left');
  });
});
