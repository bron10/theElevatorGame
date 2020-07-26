import Component from '@glimmer/component';
import { action } from '@ember/object';


export default class FloorComponent extends Component {

  @action
  goUp(level) {
    console.log(level)
    // alert(`Go to level ${level}!`);
    this.analyseLift('UP', level);
  }

  @action
  goDown(level) {
    console.log(level)
    this.analyseLift('DOWN', level);
    // alert(`Go to level ${level}!`);
  }

  analyseLift(level, direction) {
    console.log(level, direction);
  }

}