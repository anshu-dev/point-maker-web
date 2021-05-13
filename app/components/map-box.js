import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import config from 'point-maker-web/config/environment';

export default class MapBoxComponent extends Component {

  @tracked showPopup = false;
  @tracked coordinates = {lng: -96.7969879, lat: 32.7766642};
  @tracked pointFields = { name: '', latitude: '', longitude: ''};
  @tracked points = [];
  @service store;

  @tracked markers = {
    type: 'FeatureCollection',
    features: []
  }

  @action
    closePopup() {
      this.showPopup = false;
    }

  @action
     mapClicked({ target: map, point, lngLat }) {
      this.showPopup = true;
      this.coordinates = {lng: lngLat.lng, lat: lngLat.lat};
    }

  @action
    async allPoints() {
      this.points = await this.store.findAll('point');
      let features = [];
      await this.points.map((point) => {
        features.pushObject({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [ point.longitude, point.latitude ] },
          properties: { title: point.name }
        });
      });
      this.markers = {
        type: 'FeatureCollection',
        features: features,
      }
    }

  @action
    async submit() {
      let name = get(this, 'pointFields.name');
      let coordinates = get(this, 'coordinates');
      let data = { name, geometry: { longitude: coordinates.lng, latitude: coordinates.lat } }
      let pointData = this.store.createRecord('point', data);
      await pointData.save(); // => POST to '/posts'
      await this.allPoints();
      this.showPopup = false;
    }

  @action
    async updatePoints() {
      await this.allPoints();
    }
}
