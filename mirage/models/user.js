import { Model, hasMany } from 'miragejs';

export default Model.extend({
  bike: hasMany('bike'),
  order: hasMany('order'),
  comment: hasMany('comment'),
});
