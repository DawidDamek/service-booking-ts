import Model, {
  attr,
  belongsTo,
  hasMany,
  type AsyncBelongsTo,
  type AsyncHasMany,
} from '@ember-data/model';
import User from '../user/model';
import Issue from '../issue/model';
import Order from '../order/model';

export default class Bike extends Model {
  @attr
  declare photoUrl: string;
  @attr
  declare status: string;
  @attr
  declare brand: string;
  @attr
  declare model: string;
  @attr
  declare color: string;
  @attr
  declare size: string;
  @attr('string', { defaultValue: '----' })
  declare description: string;

  @belongsTo('user')
  declare owner: AsyncBelongsTo<User>;
  @hasMany('issue') declare issues: AsyncHasMany<Issue>;
  @hasMany('order')
  declare orders: AsyncHasMany<Order>;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export interface ModelRegistry {
    bike: Bike;
  }
}
