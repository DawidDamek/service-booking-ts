import Component from '@glimmer/component';
import { variantColor } from 'service-booking-ts/utils/order-statuses';

export default class Dashboard extends Component {
  get orders() {
    return this.args.model.orders;
  }

  get ordersToday() {
    const today = new Date();
    return this.orders.filter((order) => {
      return this.formatDate(order.releaseDate) === this.formatDate(today);
    });
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

  get ordersStatusesToday() {
    return [
      ...new Set(
        this.ordersToday.map((order) => {
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

  get statusColorsToday() {
    return this.ordersStatusesToday.map((status) => {
      return variantColor[status] || '#ffc107b3';
    });
  }

  get numberOfOrdersByStatus() {
    return this.ordersStatuses.map((status) => {
      return this.orders.filter((order) => {
        return order.status === status;
      }).length;
    });
  }

  get numberOfOrdersByStatusToday() {
    return this.ordersStatusesToday.map((status) => {
      return this.ordersToday.filter((order) => {
        return order.status === status;
      }).length;
    });
  }

  formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
