import { Model, belongsTo, hasMany } from 'miragejs';

export default Model.extend({
  owner: belongsTo('user'),
  bike: belongsTo('bike'),
  issue: hasMany('issue'),
  comment: hasMany('comment'),
});
