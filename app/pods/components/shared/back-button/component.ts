import { action } from '@ember/object';
import Component from '@glimmer/component';

interface SharedButtonArgs {
  type: string;
  label: string;
}

export default class SharedButton extends Component<SharedButtonArgs> {
  get type() {
    return this.args.type || 'button';
  }

  get label() {
    return this.args.label || 'Back';
  }

  @action
  onClick(event: TransitionEvent) {
    if (this.type === 'submit') {
      event.preventDefault();
    }
    history.back();
  }
}
