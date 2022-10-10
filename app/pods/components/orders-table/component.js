import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isWithinInterval, isAfter, isEqual, startOfDay } from 'date-fns';

class Dates {
  @tracked start;
  @tracked end;
}
export default class OrdersTableComponent extends Component {
  @tracked searchId = '';
  @tracked flatpickrRef;
  @tracked dates;

  @tracked isFilteredByDate = false;

  constructor() {
    super(...arguments);
    this.dates = new Dates();
  }

  get dateToday() {
    return startOfDay(new Date());
  }

  get filteredOrders() {
    const { orders } = this.args;
    if (this.isFilteredByDate) {
      return this.filteredByDate;
    }

    return this.searchId.length >= 3
      ? orders.filter((order) => {
          return order.id.includes(this.searchId);
        })
      : orders;
  }

  get filteredByDate() {
    const { orders } = this.args;
    const ordersdate = orders.filter((order) => {
      const releaseDate = startOfDay(order.releaseDate);
      if (
        isAfter(this.dates.end, this.dates.start) ||
        isEqual(this.dates.start, this.dates.end)
      ) {
        return isWithinInterval(releaseDate, {
          start: this.dates.start,
          end: this.dates.end,
        });
      }
      return false;
    });
    return ordersdate;
  }

  @action
  onSearchInput(event) {
    this.searchId = event.target.value;
  }

  @action
  inputDate() {
    this.flatpickrRef.selectedDates.map((date, i) => {
      if (i === 0) {
        this.dates.start = date;
      }
      this.dates.end = date;
    });
  }

  @action
  onFiltertogle() {
    this.searchId = '';
    this.dates.start = this.dateToday;
    this.dates.end = this.dateToday;
    this.isFilteredByDate = !this.isFilteredByDate;
  }

  @action
  onReady(_selectedDates, _dateStr, instance) {
    this.flatpickrRef = instance;
  }
}
