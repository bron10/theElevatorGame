import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
export default class TheElevatorGameRoute extends Route {
  @service('lift-mover') liftMoverService;
  constructor(){
    super(...arguments)
    // console.log("moveIt", this.moveIt);

    // this.liftMoverService.on('move', (data) => {
    //   console.log("data", data)
    //   // this.model({level : data.level, lift : data.lift})
    // })
  }

  model(selectedLift) {
    const noOfFloors = 6, noOfLifts = 3,groundFloor = 0;
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
      let levelHeight = 0;
      if(selectedLift && selectedLift.lift === liftNo){
        level = selectedLift.level;
      }
      lifts.push({ 
        level,
        levelHeight : 100 * level,
        num: liftNo,
        width: 200 * liftNo,
        num_width: 200 * liftNo + 20 });
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

