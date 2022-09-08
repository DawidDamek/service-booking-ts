import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class OrderComponent extends Component {
  @tracked option = '';

  @action
  onInput(option: any) {
    this.option = option;
  }
}
