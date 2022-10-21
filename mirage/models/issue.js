import { Model, belongsTo } from 'miragejs';

export default Model.extend({
  owner: belongsTo('user'),
  bike: belongsTo('bike'),
  order: belongsTo('order'),
});
