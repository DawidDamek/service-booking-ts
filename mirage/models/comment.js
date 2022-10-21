import { Model, belongsTo } from 'miragejs';

export default Model.extend({
  owner: belongsTo('user'),
  order: belongsTo('order'),
});
