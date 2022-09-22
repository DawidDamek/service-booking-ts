import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import SessionService from '../session/service';

export default class Login extends Controller {
  @service declare store;
  @service declare session: SessionService;
  @tracked declare loginValue: string;
  @tracked declare passwordValue: string;
  @tracked declare userExist: boolean;
  @tracked isShowSharedModal = false;

  @action
  onLoginChange({ target }: { target: HTMLInputElement }) {
    this.loginValue = target.value;
  }

  @action
  onPasswordChange({ target }: { target: HTMLInputElement }) {
    this.passwordValue = target.value;
  }

  @action
  async onSubmit(event: TransitionEvent) {
    event.preventDefault();
    const users = await this.store.query('user', {
      filter: { username: this.loginValue, password: this.passwordValue },
    });

    const user = users.firstObject;
    this.session.loginUser(user?.id || null);
    window.location.href = '/';
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  export default interface Registry {
    login: Login;
  }
}
