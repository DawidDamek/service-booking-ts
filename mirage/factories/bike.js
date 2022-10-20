import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

const sizeArr = ['S', 'M', 'L', 'XL'];

export default Factory.extend({
  brand() {
    return faker.vehicle.manufacturer();
  },

  model() {
    return faker.vehicle.model();
  },

  photoUrl() {
    return faker.image.imageUrl(320, 200, 'bicycle');
  },

  status() {
    return 'toDo';
  },

  color() {
    return faker.vehicle.color();
  },

  size() {
    return sizeArr[Math.floor(Math.random() * sizeArr.length)];
  },

  description() {
    return faker.lorem.sentence();
  },
});
