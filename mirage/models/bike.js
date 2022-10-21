import { Model, belongsTo, hasMany } from 'miragejs';

export default Model.extend({
  owner: belongsTo('user'),
  order: hasMany('order'),
  issue: hasMany('issue'),
});
