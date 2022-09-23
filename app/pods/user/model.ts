import Model, { attr, hasMany, type AsyncHasMany } from '@ember-data/model';

import Order from '../order/model';
import Comment from '../comment/model';
import Bike from '../bike/model';

export default class User extends Model {
  @attr('boolean', { defaultValue: false })
  declare isAdmin: boolean;
  @attr
  declare username: string;
  @attr
  declare password: string;
  @attr
  declare name: string;
  @attr
  declare surname: string;
  @attr
  declare email: string;
  @attr
  declare phoneNumber: string;
  @hasMany('bike')
  declare bikes: AsyncHasMany<Bike>;
  @hasMany('order')
  declare orders: AsyncHasMany<Order>;
  @hasMany('comments')
  declare comments: AsyncHasMany<Comment>;

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    user: User;
  }
}
