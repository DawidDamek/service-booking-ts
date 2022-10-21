import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, TestContext } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import 'qunit-dom';
import SessionService from 'service-booking-ts/pods/session/service';

interface Context extends TestContext {
  sessionService: SessionService;
  owner: any;
}

module('integration | Component | navbar', function (hooks) {
  setupRenderingTest(hooks);

  test('Check views for admin and non admin user', async function (this: Context, assert) {
    const admin = {
      isAdmin: true,
    };
    const user = {
      isAdmin: false,
    };

    const store = this.owner.lookup('service:store');
    const adminModel = store.createRecord('user', admin);
    const userModel = store.createRecord('user', user);
    this.sessionService = this.owner.lookup('service:session');
    this.sessionService.currentUser = adminModel;

    await render(hbs`<Nav/>`);

    assert
      .dom('[data-test-admin-panel]')
      .exists('admin panel is visible for admin');

    this.sessionService.currentUser = userModel;
    await render(hbs`<Nav/>`);

    assert
      .dom('[data-test-admin-panel]')
      .doesNotExist('admin panel is not visible for admin');
  });
});
