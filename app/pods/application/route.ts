import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class Application extends Route {
  @service declare store;

  async beforeModel() {
    const isFilledDataBase = window.localStorage.length;
    if (isFilledDataBase) {
      return;
    }

    const admin = {
      isAdmin: true,
      name: 'Dawid',
      surname: 'Admin',
      username: 'DD',
      password: 'dd123',
      email: 'dawid@dawid.com',
      phoneNumber: 123456789,
    };
    const customer1 = {
      isAdmin: true,
      name: 'Piotr',
      surname: 'Kowal',
      username: 'Piotrus',
      password: 'piotrus123',
      email: 'piter@kkk.com',
      phoneNumber: 421593093,
    };

    const adminModel = this.store.createRecord('user', admin);
    const customer1Model = this.store.createRecord('user', customer1);
    adminModel.save();
    customer1Model.save();

    const bike1Model = await this.store
      .createRecord('bike', {
        status: 'inProgress',
        brand: 'Giant',
        model: 'Reign SX',
        color: 'blue',
        size: 'L',
        owner: adminModel,
      })
      .save();

    const bike2Model = await this.store
      .createRecord('bike', {
        status: 'delivered',
        brand: 'YT',
        model: 'Capra',
        color: 'yellow',
        size: 'M',
        owner: adminModel,
      })
      .save();

    const bike3Model = await this.store
      .createRecord('bike', {
        status: 'will be delivered',
        brand: 'Romet',
        model: 'Wigry 3',
        color: 'red',
        size: 'Unisize',
        description: 'has duck on handlebar',
        owner: customer1Model,
      })
      .save();

    await this.store
      .createRecord('issue', {
        details: 'amortyzator nie działa',
        status: 'inProgress',
        bike: bike1Model,
      })
      .save();

    await this.store
      .createRecord('issue', {
        details: 'umyć całość',
        status: 'done',
        bike: bike1Model,
      })
      .save();

    await this.store
      .createRecord('issue', {
        details: 'wszytsko czeszczy',
        status: 'toDo',
        bike: bike3Model,
      })
      .save();

    await this.store
      .createRecord('issue', {
        details: 'odrdzewic',
        status: 'rejected',
        bike: bike3Model,
      })
      .save();

    await this.store
      .createRecord('issue', {
        details: 'full spa',
        status: 'toDo',
        bike: bike3Model,
      })
      .save();

    await this.store
      .createRecord('issue', {
        details: 'full spa',
        status: 'toDo',
        bike: bike2Model,
      })
      .save();

    await this.store
      .createRecord('order', {
        owner: adminModel,
        bike: bike1Model,
        type: 'service',
        acceptanceDate: new Date(2022, 8, 19),
        releaseDate: new Date(2022, 8, 26),
      })
      .save();

    await this.store
      .createRecord('order', {
        owner: adminModel,
        bike: bike2Model,
        type: 'service',
        acceptanceDate: new Date(2022, 8, 15),
        releaseDate: new Date(2022, 9, 15),
      })
      .save();

    const order3Model = await this.store
      .createRecord('order', {
        owner: customer1Model,
        bike: bike3Model,
        type: 'service',
        acceptanceDate: new Date(2022, 8, 19),
        releaseDate: new Date(2022, 8, 21),
      })
      .save();

    this.store
      .createRecord('comment', {
        owner: customer1Model,
        order: order3Model,
        content: 'byle tanio, szybko i ma być jak nowy',
      })
      .save();
  }
}
