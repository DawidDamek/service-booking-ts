import Component from '@glimmer/component';
import Order from 'service-booking-ts/pods/order/model';
import {
  variantClass,
  variantClassType,
} from 'service-booking-ts/utils/order-statuses';

interface OrdersTableRowArgs {
  order: Order;
}

export default class OrdersTableRowComponent extends Component<OrdersTableRowArgs> {
  get orderStatus() {
    return this.args.order.status;
  }

  get statusColorClass() {
    return (
      variantClass[this.orderStatus as keyof variantClassType] || 'warning'
    );
  }
}
