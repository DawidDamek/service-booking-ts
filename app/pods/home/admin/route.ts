import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import RSVP from 'rsvp';

export default class HomeAdmin extends Route {
  @service declare store: Store;

  model() {
    return RSVP.hash({
      orders: this.store.findAll('order'),
    });
  }
}
