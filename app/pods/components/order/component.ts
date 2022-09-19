import Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Bike from 'service-booking-ts/pods/bike/model';
import Issue from 'service-booking-ts/pods/issue/model';
import SessionService from 'service-booking-ts/pods/session/service';
import Order from 'service-booking-ts/pods/order/model';

export default class OrderComponent extends Component {
  @service declare store: Store;
  @service declare session: SessionService;

  @tracked declare typeOption: string;
  @tracked isShowIssueInput = false;
  @tracked declare issueDetails: string;

  declare issuesArray: Issue[];
  declare order: Order;
  serviceTypes = ['service', 'warranty', 'expertise'];

  constructor(owner: unknown, args: {}) {
    super(owner, args);
    this.order = this.store.createRecord('order', {
      owner: this.session.currentUser,
      bike: null,
      releaseDate: this.defaultReleaseDate,
    });
  }

  get noIssues() {
    return this.orderIssues.length;
  }

  get defaultReleaseDate() {
    const date = new Date().setDate(new Date().getDate() + 7);
    return new Date(date);
  }

  get shouldDisableButton() {
    return !(this.order.bike !== null && this.typeOption);
  }

  get orderIssues() {
    return this.order.issues;
  }

  get areEmptyFields() {
    return !(
      this.order.bike !== null &&
      this.typeOption &&
      this.orderIssues.length
    );
  }

  @action
  onBikeInput(selected: Bike) {
    this.order.set('bike', selected);
  }

  @action
  onTypeInput(selected: string) {
    this.typeOption = selected;
    this.order.type = selected;
  }

  @action
  onAddIssue() {
    this.isShowIssueInput = !this.isShowIssueInput;
    const input = document.getElementById('inputIssue');
    input?.focus();
  }

  @action
  onInputIssue({ target }: { target: HTMLInputElement }) {
    this.issueDetails = target.value;
  }

  @action
  onSaveIssue(event: TransitionEvent) {
    event.preventDefault();
    this.store.createRecord('issue', {
      owner: this.session.currentUser,
      bike: this.order.bike,
      order: this.order,
      status: 'toDo',
      details: this.issueDetails,
    });
    this.onCancelIssue();
  }

  @action
  onCancelOrder() {
    this.order.issues.forEach((issue) => issue.destroyRecord());
    this.onCancelIssue();
    this.order.bike = null!;
    this.typeOption = '';
  }

  @action
  onCancelIssue() {
    this.issueDetails = '';
    this.isShowIssueInput = false;
  }

  @action
  deleteRecord(issueToDelete: Issue) {
    issueToDelete.destroyRecord();
  }

  @action
  async onSaveOrder() {
    this.order.issues.forEach(async (issue) => {
      await issue.save();
    });
    await this.order.save();
    this.order.rollbackAttributes();
  }

  willDestroy() {
    super.willDestroy();
    if (this.order.hasDirtyAttributes!) {
      this.order.destroyRecord();
      this.order.issues.forEach((issue) => issue.destroyRecord());
      this.order.destroyRecord();
    }
  }
}
