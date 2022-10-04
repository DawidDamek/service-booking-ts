import Component from '@glimmer/component';
import Order from 'service-booking-ts/pods/order/model';

interface OrdersTableRowArgs {
  order: Order;
}

export default class OrdersTableRowComponent extends Component<OrdersTableRowArgs> {
  get orderStatus() {
    return this.args.order.status;
  }

  get statusColorClass() {
    return this.orderStatus === 'Completed'
      ? 'success'
      : this.orderStatus === 'Rejected'
      ? 'danger'
      : 'warning';
  }
}
