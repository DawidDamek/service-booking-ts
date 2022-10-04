import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Issue from 'service-booking-ts/pods/issue/model';

interface OrderIssueDisplayComponentArgs {
  issue: Issue;
  deleteRecord: Function;
}

export default class OrderIssueDisplayComponent extends Component<OrderIssueDisplayComponentArgs> {
  @tracked isEditing = false;
  @tracked selected = this.args.issue.status;
  issueStatuses = ['In progress', 'Done', 'Rejected', 'To do'];

  @action
  onDeleteIssue() {
    const { issue, deleteRecord } = this.args;
    deleteRecord(issue);
  }

  @action
  onEditStatus() {
    this.isEditing = !this.isEditing;
  }

  @action
  async onChange(selected: string) {
    const { issue } = this.args;
    this.selected = selected;
    issue.set('status', selected);
    selected === 'In progress' ? ((await issue.order).status = selected) : null;
    (await issue.order).save();
    await issue.save();
    this.isEditing = !this.isEditing;
  }
}
