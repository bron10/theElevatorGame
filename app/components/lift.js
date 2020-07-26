import Component from '@glimmer/component';

export default class LiftComponent extends Component {
  constructor(liftNum, noOfFloors) {
    super();
    this.liftNum = liftNum;
    this.direction = 'UP';
    this.state = 0; // 0 is idle, 1 is moving up, -1 is moving down
    this.currentFloor = 0;
    this.liftId = 'lift_' + liftNum;
    this.noOfFloors = noOfFloors;
  }
}