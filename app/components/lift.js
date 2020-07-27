import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class LiftComponent extends Component {
  @service('lift-mover') liftMoverService;
  @tracked liftId
  constructor() {
    super(...arguments)
    this.liftMoverService.on('move', (data) => {
      const lifts = this.get('building.lifts');
      const isLiftAtSameFloor = lifts.find(
        (lift) => lift.level === data.level
      );
      if (isLiftAtSameFloor === undefined) {
        this.findLift(data);
      }
    })
  }

  findLift(data) {
    const level = data.level;
    const direction = data.direction;
    const UP_DIRECTION = 1;
    const DOWN_DIRECTION = 0;
    const TOTAL_LEVELS = 6;
    const lifts = this.get('building.lifts');
    // top floor
    if (level === TOTAL_LEVELS) {
      let liftsInDirection = lifts.filter(
        (lift) => lift.direction === UP_DIRECTION
      );
      if (!liftsInDirection.length) {
        liftsInDirection = lifts.filter(
          (lift) => lift.direction === DOWN_DIRECTION
        );
      }
      const { lift } = this.findMyLift(
        level,
        liftsInDirection
      );
      this.moveLift(level, direction, lift);
    }
    // ground floor
    else if (level === 0) {
      let liftsInDirection = lifts.filter(
        (lift) => lift.direction === DOWN_DIRECTION
      );
      if (!liftsInDirection.length) {
        liftsInDirection = lifts.filter(
          (lift) => lift.direction === UP_DIRECTION
        );
      }
      const { lift } = this.findMyLift(
        level,
        liftsInDirection
      );
      this.moveLift(level, direction, lift);
    }
    // any mid floor
    else {
      if (direction === UP_DIRECTION) {
        let findLiftsBelowThisFloor = lifts.filter(
          (lift) => lift.direction === UP_DIRECTION && lift.level < level
        );
        if (!findLiftsBelowThisFloor.length) {
          findLiftsBelowThisFloor = lifts.filter(
            (lift) => lift.direction === DOWN_DIRECTION && lift.level > level
          );
        }
        console.log('below', findLiftsBelowThisFloor, lifts)
        const { lift } = this.findMyLift(
          level,
          findLiftsBelowThisFloor
        );
        console.log(lift)
        this.moveLift(level, direction, lift);
      } else {
        let findLiftsAboveThisFloor = lifts.filter(
          (lift) => lift.direction === DOWN_DIRECTION && lift.level > level
        );
        if (!findLiftsAboveThisFloor.length) {
          findLiftsAboveThisFloor = lifts.filter(
            (lift) => lift.direction === UP_DIRECTION && lift.level < level
          );
        }
        console.log('above', findLiftsAboveThisFloor, lifts)
        const { lift } = this.findMyLift(
          level,
          findLiftsAboveThisFloor
        );
        console.log(lift)
        this.moveLift(level, direction, lift);
      }
    }
  }

  findMyLift(pressedFloor, targetLifts) {
    let lift = {};
    let minDistance = Number.POSITIVE_INFINITY;
    for (let liftProperty of targetLifts) {
      if (
        liftProperty.state === 0 &&
        Math.abs(Number(pressedFloor) - Number(liftProperty.level)) <
        minDistance
      ) {
        minDistance = pressedFloor - liftProperty.level;
        lift = liftProperty;
      }
    }
    const absoluteValue = Math.abs(minDistance);
    return { lift: lift, minDistance: absoluteValue };
  }

  moveLift(level, direction, lift) {
    const lifts = this.get('building.lifts');
    const liftToMoveIndex = lifts.findIndex(
      (ele) => ele.num === lift.num
    );
    // console.log(liftToMoveIndex)
    let thisLift = lifts[liftToMoveIndex];
    // console.log(thisLift);
    // if the lift is already moving then do nothing
    if (thisLift.state !== 0) return;

    thisLift.state = direction === this.UP_DIRECTION ? 1 : -1;
    this.showAnimation(level, direction, thisLift);
  }

  showAnimation(level, direction, elevator) {
    if (elevator.state === 0) return;
    const lifts = this.get('building.lifts');
    const updated = lifts.map((lift) => {
      if (lift.num == elevator.num) {
        const getElevatorFromDOM = document.getElementById('lift_' + elevator.num);
        if (elevator.direction) {
          set(lift, 'levelHeight', this.levelUp(level));
        } else {
          set(lift, 'levelHeight', this.levelDown(lift.level, level));
        }
        getElevatorFromDOM.addEventListener('transitionend', () => {
          console.log('Transition ended!!');
          set(lift, 'level', level)
          set(lift, 'direction', direction);
          set(lift, 'state', 0);
        });
      }
      return lift
    })
    this.set('building.lifts', updated);
  }

  levelUp(level) {
    return (level * 100) + level * 2;
  }

  levelDown(currentLevel, newLevel) {
    if (currentLevel > newLevel) {
      return (newLevel * 100) + (newLevel * 2);
    }
    let levelDifference = currentLevel - newLevel;
    return (levelDifference * 100);
  }

  didUpdate() {
    console.log("cccc", this.get('building.lifts'))
  }
}