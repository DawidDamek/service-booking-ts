import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import SessionService from 'service-booking-ts/pods/session/service';

export default class NavComponent extends Component {
  @service declare session: SessionService;

  get isUserAdmin() {
    return this.session.currentUser.isAdmin;
  }

  get loggedUser() {
    return this.session.currentUser;
  }

  @action
  onLogout() {
    this.session.logoutUser();
  }
}
