import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | points', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  const points = [
    {id: 1, name: 'result 1', latitude: '33.4444', longitude: '76.33333' },
    {id: 2, name: 'result 2', latitude: '35.4444', longitude: '75.30333' }
  ];


  test('it renders', async function(assert) {
    await render(hbs`<Points />`);

    assert.equal(this.element.querySelector('h3').textContent.trim(), 'Points');
  });

  test('list points', async function(assert) {
    for (let i=0; i<5; i++) {
      this.server.create('point', { id: i+1, name: `point ${i}` });
    }
    let store = this.owner.lookup('service:store');
    let points = await store.findAll('point');
    this.set('points', points);
    await render(hbs`<Points @points={{this.points}} />`);
    assert.equal(this.element.querySelectorAll('.points').length, 5);
  });
});
