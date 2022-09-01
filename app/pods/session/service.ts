import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { tracked } from '@glimmer/tracking';
import User from '../user/model';
import Store from '@ember-data/store';

export default class SessionService extends Service {
  @storageFor('logged-as') declare loggedAs: Storage;
  @service declare store: Store;
  @tracked declare currentUser: User;

  get isLoggedIn() {
    return this.loggedAs['get']('id');
  }

  async loginUser(id: string | null) {
    this.loggedAs['set']('id', id);
    await this.setCurrentUser();
  }

  logoutUser() {
    this.loggedAs['set']('id', null);
    window.location.href = '/login';
  }

  async setCurrentUser() {
    const userId = this.loggedAs['get']('id');
    const user = await this.store.findRecord('user', userId);
    this.currentUser = user;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  export default interface Registry {
    // eslint-disable-next-line no-undef
    session: SessionService;
  }
}
