import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class LiftComponent extends Component {
  @service('lift-mover') liftMoverService;
  constructor() {
    super(...arguments)
    // this.liftNum = liftNum;
    // this.direction = 'UP';
    // this.state = 0; // 0 is idle, 1 is moving up, -1 is moving down
    // this.currentFloor = 0;
    // this.liftId = 'lift_' + liftNum;
    // this.noOfFloors = noOfFloors;
    // console.log("this", this.element)
    
    this.liftMoverService.on('move', (data) => {
      console.log("data - ->", data)
      // this.model({level : data.level, lift : data.lift})
    })
  }

}