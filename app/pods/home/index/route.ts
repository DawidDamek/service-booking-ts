import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class IndexRoute extends Route {
  @service declare store;

  async model() {
    return RSVP.hash({
      bikes: this.store.findAll('bike'),
      owners: this.store.findAll('user'),
      issues: this.store.findAll('issue'),
      orders: this.store.findAll('order'),
      comments: this.store.findAll('comment'),
    });
  }
}
