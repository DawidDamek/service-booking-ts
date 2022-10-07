import Component from '@glimmer/component';
import { variantColor } from 'service-booking-ts/utils/order-statuses';
import { format } from 'date-fns';

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
    return this.calculateStatuses(this.orders);
  }

  get ordersStatusesToday() {
    return this.calculateStatuses(this.ordersToday);
  }

  get months() {
    return Array.from({ length: 12 }, (_, index) =>
      format(new Date(2022, index), 'MMMM')
    );
  }

  get numberOfOrdersBymonth() {
    return this.months.map((_, index) => {
      return this.orders.filter((order) => {
        const date = order.acceptanceDate;
        return date.getMonth() === index;
      }).length;
    });
  }

  get statusColors() {
    return this.calculateStatusColors(this.ordersStatuses);
  }

  get statusColorsToday() {
    return this.calculateStatusColors(this.ordersStatusesToday);
  }

  get numberOfOrdersByStatus() {
    return this.calculateOrdersNumber(this.ordersStatuses, this.orders);
  }

  get numberOfOrdersByStatusToday() {
    return this.calculateOrdersNumber(
      this.ordersStatusesToday,
      this.ordersToday
    );
  }

  calculateStatuses(orders) {
    return [
      ...new Set(
        orders.map((order) => {
          return order.status;
        })
      ),
    ];
  }

  calculateStatusColors(statuses) {
    return statuses.map((status) => {
      return variantColor[status] || '#ffc107b3';
    });
  }

  calculateOrdersNumber(statuses, orders) {
    return statuses.map((status) => {
      return orders.filter((order) => {
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
