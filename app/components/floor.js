import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class FloorComponent extends Component {
  @service('lift-mover') liftMoverService;
  constructor() {
    super(...arguments)
    // console.log("moveIt", this.moveIt);
  }

  @action
  goUp(level) {
    this.liftMoverService.trigger('move', { level, direction: 1 })
  }

  @action
  goDown(level) {
    this.liftMoverService.trigger('move', { level, direction: 0 })
  }
}