import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  name() {
    return faker.name.firstName();
  },

  surname() {
    return faker.name.lastName();
  },

  username() {
    return faker.image.imageUrl(320, 200, 'bicycle');
  },

  isAdmin() {
    return false;
  },

  email() {
    return faker.internet.email();
  },

  phoneNumber() {
    return faker.phone.number();
  },

  password() {
    return faker.internet.password(10);
  },
});
