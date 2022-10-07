import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class OrdersTableComponent extends Component {
  @tracked searchParams = '';

  get filteredOrders() {
    const { orders } = this.args;
    return this.searchParams.length >= 3
      ? orders.filter((order) => {
          return order.id.includes(this.searchParams);
        })
      : orders;
  }

  @action
  onSearchInput(event) {
    this.searchParams = event.target.value;
  }
}
