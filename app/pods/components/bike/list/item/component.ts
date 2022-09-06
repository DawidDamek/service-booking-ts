import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Bike from 'service-booking-ts/pods/bike/model';

interface BikeListItemArgs {
  bike: Bike;
}

export default class BikeListItemComponent extends Component<BikeListItemArgs> {
  @tracked isShowEditModal = false;

  @action
  onDeleteBike() {
    this.args.bike.destroyRecord();
  }

  @action
  onShowEditModalToggle() {
    this.isShowEditModal = !this.isShowEditModal;
  }
}
