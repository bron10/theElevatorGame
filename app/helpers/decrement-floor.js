import Helper from '@ember/component/helper';

export default Ember.Helper.extend({
  compute(args, hash) {
    // let count = this.get('count');
    console.log("hash", args, hash);
    // let count = this.get('count');
    // /
    return (hash.total - hash.current) + 1;
  }
});
