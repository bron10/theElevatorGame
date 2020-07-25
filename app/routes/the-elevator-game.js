import Route from '@ember/routing/route';

export default class TheElevatorGameRoute extends Route {
   
    model() {
        return {
            levels : Array.from(Array(5), (_, i) => i + 1),
            lifts : Array.from(Array(3)),
        };
    }
}
