import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PointsComponent extends Component {

  @service store;
  @tracked showEditPopup = false;
  @tracked pointFields = {id: 0, name: ''};

  @action
    editPopup(point) {
      this.showEditPopup = true;
      const { id, name } = point;
      this.pointFields = {id, name };
    }

  @action
    hidePopup() {
      this.showEditPopup = false;
    }

  @action
    async editPoint(pointData) {
      this.args.editPointOnMap(pointData);
    }

  @action
    async deletePoint(id) {
      let point = await this.store.findRecord('point', id, { reload: true });
      await point.destroyRecord();
      this.args.updatePoints();
    }

  @action
    async handleSearch(e){
      this.args.searchPoints(e.target.value);
    }
}