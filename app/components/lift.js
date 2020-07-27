import Component from '@ember/component';
import { inject as service } from '@ember/service';
import {set} from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class LiftComponent extends Component {
  @service('lift-mover') liftMoverService;
  @tracked liftId
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
      console.log("data - ->", data);
      let lifts = this.get('building.lifts');
      const updated = lifts.map((lift, index) => {
        if(lift.num == data.lift){
          // lift.levelHeight = data.level * 100;
          if(data.direction){
            set(lift, 'levelHeight', this.levelUp(data.level));
          }else{
            set(lift, 'levelHeight', this.levelDown(lift.level, data.level));
          }
          set(lift, 'level', data.level)
        }
        return lift
      })
      this.set('building.lifts', updated);
            // set('building.lifts', lifts);
      //console.log("new data", lifts)  
      // this.model({level : data.level, lift : data.lift})
    })
  }

  levelUp(level){
    return (level * 100) + level
  }

  levelDown(currentLevel, newLevel){
    let levelDifference = currentLevel - newLevel;
    return (levelDifference * 100) - newLevel;
  }

  

  didUpdate(){
    console.log("cccc", this.get('building.lifts'))
  }
}