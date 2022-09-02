import { action } from '@ember/object';
import Component from '@glimmer/component';
import Comment from 'service-booking-ts/pods/comment/model';

interface CommentArgs {
  comment: Comment;
}

export default class CommentComponent extends Component<CommentArgs> {
  @action
  onDeleteComment() {
    this.args.comment.destroyRecord();
  }
}
