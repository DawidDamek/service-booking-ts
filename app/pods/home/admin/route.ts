import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import RSVP from 'rsvp';

export default class HomeAdmin extends Route {
  @service declare store: Store;

  async model() {
    return RSVP.hash({
      orders: await this.store.findAll('order'),
      issues: await this.store.findAll('issue'),
      comments: await this.store.findAll('comment'),
      bikes: await this.store.findAll('bike'),
    });
  }
}
