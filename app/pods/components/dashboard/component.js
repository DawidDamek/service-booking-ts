import Component from '@glimmer/component';
import { variantColor } from 'service-booking-ts/utils/order-statuses';

export default class Dashboard extends Component {
  get orders() {
    return this.args.model.orders;
  }

  get ordersStatuses() {
    return [
      ...new Set(
        this.orders.map((order) => {
          return order.status;
        })
      ),
    ];
  }

  get statusColors() {
    return this.ordersStatuses.map((status) => {
      return variantColor[status] || '#ffc107b3';
    });
  }

  get numberOfOrdersByStatus() {
    const { orders } = this.args.model;
    return this.ordersStatuses.map((status) => {
      return orders.filter((order) => {
        return order.status === status;
      }).length;
    });
  }
}
