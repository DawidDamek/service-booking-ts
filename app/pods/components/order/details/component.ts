import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Order from 'service-booking-ts/pods/order/model';
import SessionService from 'service-booking-ts/pods/session/service';
import Store from '@ember-data/store';

interface OrderDetailsArgs {
  model: {
    order: typeof Order;
  };
}

export default class OrderDetails extends Component<OrderDetailsArgs> {
  @service declare store: Store;
  @service declare session: SessionService;
  @tracked declare comment: string;
  @tracked showCommentField = false;
  @tracked order = this.args.model.order;

  @action
  onInputComment({ target }: { target: HTMLInputElement }) {
    this.comment = target.value;
  }

  @action
  async onSaveComment(event: TransitionEvent) {
    event.preventDefault();
    const order = this.args.model.order;
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

  // didInsertBike(element: HTMLElement) {
  //   // const {brand, model} = this.args.model.order.bike
  //   element.textContent = `${this.args.model}`;
  // }
}