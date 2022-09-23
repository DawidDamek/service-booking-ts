import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Order from 'service-booking-ts/pods/order/model';

interface FindOrderArgs {
  model: {
    orders: typeof Order;
  };
}

export default class FindOrder extends Component<FindOrderArgs> {
  @tracked isShowOrder = false;
  @tracked id = '';

  get filteredOrder() {
    const orders = this.args.model.orders;
    return orders.filter(({ id }: { id: string }) => id === this.id);
  }

  @action
  onOrderIdFilter({ target }: { target: HTMLInputElement }) {
    this.id = target.value;
  }

  @action
  onShowOrder() {
    this.isShowOrder = true;
  }

  @action
  onHideOrder() {
    this.id = '';
    this.isShowOrder = false;
  }
}
