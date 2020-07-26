import Route from '@ember/routing/route';

export default class TheElevatorGameRoute extends Route {

  model() {
    const noOfFloors = 6;
    const noOfLifts = 3;
    const lifts = [];
    const floors = [];

    for (let i = 1; i <= noOfFloors; i++) {
      const upBtn = i > 1 ? true : false;
      const downBtn = i < noOfFloors ? true : false;
      const floorName = i == 1 ? 'Ground' : i + 'th';
      floors.push({ up: upBtn, down: downBtn, num: i, name: floorName });
    }
    for (let i = 1; i <= noOfLifts; i++) {
      lifts.push({ num: i, width: 200 * i, num_width: 200 * i + 20 });
    }

    return {
      levels: Array.from(floors),
      lifts: Array.from(lifts),
    };
  }
}
