import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import SessionService from '../session/service';
import { inject as service } from '@ember/service';

export default class Login extends Route {
  @service declare router: RouterService;
  @service declare store;
  @service declare session: SessionService;

  async beforeModel() {
    const { isLoggedIn } = this.session;
    if (isLoggedIn) {
      await this.session.setCurrentUser();
      this.router.transitionTo('home');
      return;
    }
  }
}
