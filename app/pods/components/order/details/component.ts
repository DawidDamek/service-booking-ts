import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Order from 'service-booking-ts/pods/order/model';
import SessionService from 'service-booking-ts/pods/session/service';
import Store from '@ember-data/store';
import { Route } from '@ember/routing';
import Issue from 'service-booking-ts/pods/issue/model';

interface OrderDetailsArgs {
  model: {
    order: Order;
    issues: Issue;
  };
}

type flatpickrRefInstance = {
  selectedDates: any;
};

export default class OrderDetails extends Component<OrderDetailsArgs> {
  @service declare store: Store;
  @service declare router: Route;
  @service declare session: SessionService;
  @tracked declare comment: string;
  @tracked showCommentField = false;
  @tracked order = this.args.model.order;
  @tracked declare flatpickrRef: flatpickrRefInstance;

  get currentOrder() {
    return this.args.model.order;
  }

  get shouldBeDisabledButton() {
    return !this.comment;
  }

  get isAdmin() {
    return this.session.currentUser.isAdmin;
  }

  get cannotBeCompleted() {
    const { issues } = this.currentOrder;
    const allowedStatusesArr = ['Done', 'Rejected'];
    return issues.filter(({ status }) => {
      return !allowedStatusesArr.includes(status);
    }).length;
  }

  @action
  onInputComment({ target }: { target: HTMLInputElement }) {
    this.comment = target.value;
  }

  @action
  async onSaveComment() {
    await this.store
      .createRecord('comment', {
        owner: this.session.currentUser,
        order: this.currentOrder,
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

  @action
  deleteOrder() {
    this.router.transitionTo('/profile', {});
    this.currentOrder.destroyRecord();
  }

  @action
  async onChangeOrderStatus(status: string) {
    this.currentOrder.status = status;
    await this.currentOrder.save();
  }

  @action
  async inputDate() {
    this.currentOrder.releaseDate = this.flatpickrRef.selectedDates[0];
    await this.currentOrder.save();
  }

  @action
  onReady(
    _selectedDates: object,
    _dateStr: string,
    instance: flatpickrRefInstance
  ) {
    this.flatpickrRef = instance;
  }
}
