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
import Issue from '../issue/model';

export default class Order extends Model {
  // eslint-disable-next-line no-unused-vars
  static filter(arg0: ({ id }: { id: string }) => boolean) {
    throw new Error('Method not implemented.');
  }
  @attr('string')
  declare type: string;
  @attr('string', { defaultValue: 'Not completed' })
  declare status: Date;
  @attr('date', { defaultValue: () => new Date() })
  declare acceptanceDate: Date;
  @attr('date', { defaultValue: () => new Date() }) declare releaseDate: Date;
  @hasMany('comment')
  declare comments: AsyncHasMany<Comment>;
  @hasMany('issue')
  declare issues: AsyncHasMany<Issue>;
  @belongsTo('user')
  declare owner: AsyncBelongsTo<User>;
  @belongsTo('bike')
  declare bike: AsyncBelongsTo<Bike>;

  defaultReleaseDate() {
    const date = new Date();
    date.setDate(date.getDate() + 7);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    order: Order;
  }
}
