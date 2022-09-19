import { action } from '@ember/object';
import Component from '@glimmer/component';
import Issue from 'service-booking-ts/pods/issue/model';

interface OrderIssueDisplayComponentArgs {
  issue: Issue;
  deleteRecord: Function;
}

export default class OrderIssueDisplayComponent extends Component<OrderIssueDisplayComponentArgs> {
  @action
  onDeleteIssue() {
    const { issue, deleteRecord } = this.args;
    deleteRecord(issue);
  }
}
