import Model, { attr, belongsTo, type AsyncBelongsTo } from '@ember-data/model';
import Order from '../order/model';
import User from '../user/model';

export default class Comment extends Model {
  @attr('string')
  declare content: string;
  @belongsTo('order')
  declare order: AsyncBelongsTo<Order>;
  @belongsTo('user')
  declare owner: AsyncBelongsTo<User>;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    comment: Comment;
  }
}
