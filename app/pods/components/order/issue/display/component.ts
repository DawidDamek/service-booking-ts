import { action } from '@ember/object';
import Component from '@glimmer/component';
import Issue from 'service-booking-ts/pods/issue/model';

interface OrderIssueDisplayComponentArgs {
  issue: Issue;
  removeRecord: Function;
}

export default class OrderIssueDisplayComponent extends Component<OrderIssueDisplayComponentArgs> {
  @action
  onDeleteIssue() {
    const { issue, removeRecord } = this.args;
    removeRecord(issue);
  }
}
