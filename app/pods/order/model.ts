import Model, {
  attr,
  hasMany,
  belongsTo,
  type AsyncBelongsTo,
  type AsyncHasMany,
} from '@ember-data/model';
import User from '../user/model';
import Bike from '../bike/model';
import Comment from '../comment/model';

export default class Order extends Model {
  static filter(arg0: ({ id }: { id: string }) => boolean) {
    throw new Error('Method not implemented.');
  }
  @attr('string')
  declare type: string;
  @attr('date', { defaultValue: () => new Date() })
  declare acceptanceDate: Date;
  @attr('date', { defaultValue: () => new Date() }) declare releaseDate: Date;
  @hasMany('comment')
  declare comments: AsyncHasMany<Comment>;
  @belongsTo('user')
  declare owner: AsyncBelongsTo<User>;
  @belongsTo('bike')
  declare bike: AsyncBelongsTo<Bike>;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    order: Order;
  }
}
