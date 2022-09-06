import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

interface ProfileAccordinArgs {}

export default class ProfileAccordin extends Component<ProfileAccordinArgs> {
  @tracked isShowAddModal = false;

  @action
  onShowAddModalToggle() {
    this.isShowAddModal = !this.isShowAddModal;
  }
}
