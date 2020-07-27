import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class TheElevatorGameRoute extends Route {
  @service('lift-mover') liftMoverService;
  constructor() {
    super(...arguments)
  }

  model(selectedLift) {
    const noOfFloors = 6, noOfLifts = 3, groundFloor = 0;
    const lifts = [];
    const floors = [];

    for (let i = groundFloor; i <= noOfFloors; i++) {
      const upBtn = i >= groundFloor && i < noOfFloors;
      const downBtn = i > groundFloor && i <= noOfFloors;
      const floorName = i == groundFloor ? 'Ground' : i + 'th';
      floors.push({
        up: upBtn,
        down: downBtn,
        num: i,
        name: floorName
      });
    }
    for (let i = groundFloor; i < noOfLifts; i++) {
      let level = 0;
      let liftNo = i + 1;
      if (selectedLift && selectedLift.lift === liftNo) {
        level = selectedLift.level;
      }
      lifts.push({
        level: level,
        direction: 1,
        levelHeight: 100 * level,
        num: liftNo,
        state: 0,
        width: 200 * liftNo,
        num_width: 200 * liftNo + 20
      });
    }

    console.log("levels", lifts);
    return {
      levels: Array.from(floors).reverse(),
      lifts: Array.from(lifts),
    };
  }

  // @action
  // move(){
  //   console.log("on change")
  // }

}

