import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import SessionService from 'service-booking-ts/pods/session/service';
import User from 'service-booking-ts/pods/user/model';

interface EditUserPropertyArgs {
  userProperty: keyof User;
}

type editableUserTypes = Omit<User, 'bikes' | 'orders' | 'comments'>;

export default class EditUserProperty extends Component<EditUserPropertyArgs> {
  @service declare session: SessionService;
  @tracked isEditable = false;
  @tracked userProperty = this.args.userProperty;
  @tracked target = document.querySelector('input') as HTMLInputElement;

  get shouldNotEdit() {
    return !this.isEditable;
  }

  get currentUser() {
    return this.session.currentUser;
  }

  get property() {
    return this.args.userProperty;
  }

  @action
  onSave() {
    this.target.blur();
    this.currentUser.save();
    this.#editSwitch();
  }

  @action
  onCancel() {
    this.currentUser.rollbackAttributes();
    this.#editSwitch();
  }

  @action
  onEditPropertySwitch() {
    this.target.focus();
    this.#editSwitch();
  }

  @action
  onPropertyChange<T extends keyof editableUserTypes>(
    key: T,
    { target }: { target: HTMLInputElement }
  ) {
    this.currentUser[key] = target.value as User[T];
  }

  #editSwitch() {
    this.isEditable = !this.isEditable;
  }
}
