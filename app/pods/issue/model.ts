import Model, { attr, belongsTo, type AsyncBelongsTo } from '@ember-data/model';
import Bike from '../bike/model';

export default class Issue extends Model {
  @attr('string')
  declare details: string;
  @attr('string')
  declare status: string;
  @belongsTo('bike')
  declare bike: AsyncBelongsTo<Bike>;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    issue: Issue;
  }
}
