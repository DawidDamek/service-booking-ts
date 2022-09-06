import { action } from '@ember/object';
import Component from '@glimmer/component';
import { service } from '@ember/service';
import Store from '@ember-data/store';
import Bike from 'service-booking-ts/pods/bike/model';
import SessionService from 'service-booking-ts/pods/session/service';

interface BikeEditArgs {
  bike: Bike;
  onToggle: Function;
}

type BikeType =
  | 'brand'
  | 'size'
  | 'model'
  | 'description'
  | 'color'
  | 'photoUrl';

export default class BikeEdit extends Component<BikeEditArgs> {
  @service declare store: Store;
  @service declare session: SessionService;

  get isEmptyField() {
    const { brand, model, size, color, photoUrl } = this.args.bike;
    return !(brand && model && size && color && photoUrl);
  }

  @action
  onPropertyChange(key: BikeType, { target }: { target: HTMLInputElement }) {
    this.args.bike[key] = target.value;
  }

  @action
  onSave() {
    this.args.bike.save();
    this.args.onToggle();
  }

  @action
  onCancel() {
    this.args.bike.rollbackAttributes();
    this.args.onToggle();
  }
}
