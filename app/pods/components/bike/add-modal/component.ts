import { action } from '@ember/object';
import Component from '@glimmer/component';
import { service } from '@ember/service';
import Store from '@ember-data/store';
import Bike from 'service-booking-ts/pods/bike/model';
import SessionService from 'service-booking-ts/pods/session/service';

interface BikeAddArgs {
  onToggle: Function;
}

type BikeType =
  | 'brand'
  | 'size'
  | 'model'
  | 'description'
  | 'color'
  | 'photoUrl';

export default class BikeAdd extends Component<BikeAddArgs> {
  @service declare store: Store;
  @service declare session: SessionService;
  bike: Bike;

  constructor(owner: unknown, args: { onToggle: Function }) {
    super(owner, args);
    this.bike = this.store.createRecord('bike', {
      owner: this.session.currentUser,
    });
  }

  get isEmptyField() {
    const { brand, model, size, color, photoUrl } = this.bike;
    return !(brand && model && size && color && photoUrl);
  }

  @action
  onPropertyChange(key: BikeType, { target }: { target: HTMLInputElement }) {
    this.bike[key] = target.value;
  }

  @action
  onSave() {
    this.bike.save();
    this.args.onToggle();
  }

  @action
  onCancel() {
    this.bike.destroyRecord();
    this.args.onToggle();
  }
}
