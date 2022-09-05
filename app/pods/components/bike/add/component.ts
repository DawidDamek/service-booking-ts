import { action } from '@ember/object';
import Component from '@glimmer/component';
import { service } from '@ember/service';
import Store from '@ember-data/store';
import Bike from 'service-booking-ts/pods/bike/model';

interface BikeAddArgs {}
type BikeType =
  | 'brand'
  | 'size'
  | 'model'
  | 'description'
  | 'color'
  | 'photoUrl';

export default class BikeAdd extends Component<BikeAddArgs> {
  @service declare store: Store;
  bike: Bike;

  constructor(owner: unknown, args: {}) {
    super(owner, args);
    this.bike = this.store.createRecord('bike');
  }

  get isEmptyField() {
    const { brand, model, size, color, photoUrl } = this.bike;
    return Boolean(brand && model && size && color && photoUrl);
  }

  @action
  onPropertyChange(key: BikeType, { target }: { target: HTMLInputElement }) {
    this.bike[key] = target.value;
    console.log(this.bike[key]);
  }
}
