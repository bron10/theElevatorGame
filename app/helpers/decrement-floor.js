import { helper } from '@ember/component/helper';

// export default helper(function incrementFloor(params/*, hash*/) {
//   console.log("params", params);
//   let value = params[0];
//   return ++value;
// });

export default Ember.Helper.extend({
  compute(args, hash) {
    // let count = this.get('count');
    console.log("hash", args ,hash);
    // let count = this.get('count');
    // /
    return (hash.total - hash.current) + 1;
  }
});
