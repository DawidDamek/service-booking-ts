import Route from '@ember/routing/route';
import { service } from '@ember/service';
import SessionService from 'service-booking-ts/pods/session/service';
import RSVP from 'rsvp';

export default class HomeOrderShow extends Route {
  @service declare store;
  @service declare session: SessionService;

  async model({ id }: { id: string }) {
    return RSVP.hash({
      order: await this.store.findRecord('order', id),
      issues: await this.store.findAll('issue'),
      comments: await this.store.findAll('comment'),
      bikes: await this.store.findAll('bike'),
    });
  }
}
