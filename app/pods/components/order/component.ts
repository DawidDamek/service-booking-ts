import Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Bike from 'service-booking-ts/pods/bike/model';
import Issue from 'service-booking-ts/pods/issue/model';
import { A } from '@ember/array';

export default class OrderComponent extends Component {
  @service declare store: Store;
  @tracked declare bikeOption: Bike;
  @tracked declare typeOption: string;
  @tracked issuesArr: Issue[] = A([]);
  @tracked declare issueDetails: string;
  @tracked isShowIssueInput = false;

  types = ['service', 'warranty', 'expertise'];

  get shouldDisableButton() {
    return !(this.bikeOption && this.typeOption);
  }

  @action
  onBikeInput(selected: Bike) {
    this.bikeOption = selected;
  }

  @action
  onTypeInput(selected: string) {
    this.typeOption = selected;
  }

  @action
  onAddIssue() {
    this.isShowIssueInput = !this.isShowIssueInput;
  }

  @action
  onInputIssue({ target }: { target: HTMLInputElement }) {
    this.issueDetails = target.value;
  }

  @action
  async onSaveIssue(event: TransitionEvent) {
    event.preventDefault();
    const issue = await this.store
      .createRecord('issue', {
        bike: this.bikeOption,
        status: 'toDo',
        details: this.issueDetails,
      })
      .save();
    this.issuesArr.pushObject(issue);
    this.onCancelIssue();
  }

  @action
  onCancelIssue() {
    this.issueDetails = '';
    this.isShowIssueInput = false;
  }

  @action
  removeRecord(issueToDelete: Issue) {
    return (this.issuesArr = this.issuesArr.filter(
      (issue) => issue !== issueToDelete
    ));
  }
}
