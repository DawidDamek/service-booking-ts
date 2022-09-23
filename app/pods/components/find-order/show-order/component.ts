import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Order from 'service-booking-ts/pods/order/model';
import User from 'service-booking-ts/pods/user/model';
import SessionService from 'service-booking-ts/pods/session/service';
import Store from '@ember-data/store';

interface ShowOrderArgs {
  model: {
    orders: typeof Order;
    users: typeof User;
  };
  orderId: number;
}

export default class ShowOrder extends Component<ShowOrderArgs> {
  @service declare store: Store;
  @service declare session: SessionService;
  @tracked declare comment: string;
  @tracked showCommentField = false;

  @action
  onInputComment({ target }: { target: HTMLInputElement }) {
    this.comment = target.value;
  }

  @action
  async onSaveComment() {
    const order = await this.store.findRecord('order', this.args.orderId);
    await this.store
      .createRecord('comment', {
        owner: this.session.currentUser,
        order: order,
        content: this.comment,
      })
      .save();
    this.onCancelComment();
  }

  @action
  onCancelComment() {
    this.comment = '';
    this.showCommentField = false;
  }

  @action
  onAddComment() {
    this.showCommentField = true;
  }
}
