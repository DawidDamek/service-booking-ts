import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import RSVP from 'rsvp';
import SessionService from 'service-booking-ts/pods/session/service';

export default class HomeOrderNewRoute extends Route {
  @service declare session: SessionService;
  @service declare store: Store;

  model() {
    return RSVP.hash({
      bikes: this.store.findAll('bike'),
      user: this.session.currentUser,
      issues: this.store.findAll('issue'),
      orders: this.store.findAll('order'),
      comments: this.store.findAll('comment'),
    });
  }
}
