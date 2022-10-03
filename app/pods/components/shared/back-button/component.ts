import { action } from '@ember/object';
import Component from '@glimmer/component';

interface SharedButtonArgs {
  type: string;
}

export default class SharedButton extends Component<SharedButtonArgs> {
  get type() {
    return this.args.type || 'button';
  }

  @action
  onClick(event: TransitionEvent) {
    if (this.type === 'submit') {
      event.preventDefault();
    }
    history.back();
  }
}
