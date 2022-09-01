import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Order from 'service-booking-ts/pods/order/model';
import User from 'service-booking-ts/pods/user/model';

interface ShowOrderArgs {
  model: {
    orders: typeof Order;
    users: typeof User;
  };
  filteredOrder: any;
}

export default class ShowOrder extends Component<ShowOrderArgs> {
  @service declare store: any;
  @tracked comment = '';
  @tracked showCommentField = false;

  @action
  onCommentInput({ target }: { target: HTMLInputElement }) {
    this.comment = target.value;
  }

  @action
  async onSaveComment() {
    this.store
      .createRecord('comment', {
        order: this.args.filteredOrder,
        content: 'a',
      })
      .save();
  }

  @action
  onCancelComment() {
    this.comment = '';
    this.showCommentField = false;
  }

  @action
  onAddComment() {
    this.comment = '';
    this.showCommentField = true;
  }
}
