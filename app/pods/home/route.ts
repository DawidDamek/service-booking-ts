import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { inject as service } from '@ember/service';
import SessionService from '../session/service';

export default class Home extends Route {
  @service declare router: RouterService;
  @service declare session: SessionService;

  async beforeModel() {
    const { isLoggedIn } = this.session;
    if (!isLoggedIn) {
      this.router.transitionTo('/login');
      return;
    }

    await this.session.setCurrentUser();
  }
}
