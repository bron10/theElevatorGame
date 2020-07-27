import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | lift-mover', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:lift-mover');
    assert.ok(service);
  });
});
