import { action } from '@ember/object';
import Component from '@glimmer/component';

interface SharedButtonArgs {
  onClick: Function;
  type: string;
}

export default class SharedButton extends Component<SharedButtonArgs> {
  get type() {
    return this.args.type || 'button';
  }

  @action
  onClick() {
    this.args?.onClick?.();
  }
}
