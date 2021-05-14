import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import config from 'point-maker-web/config/environment';
const initialPointVal = { id: '', name: '', latitude: '', longitude: ''}
export default class MapBoxComponent extends Component {

  @tracked showPopup = false;
  @tracked isUpdate = false;
  @tracked coordinates = {lng: -96.7969879, lat: 32.7766642};
  @tracked pointFields = initialPointVal;
  @tracked points = [];
  @service store;
  // @tracked point = {}

  @tracked markers = {
    type: 'FeatureCollection',
    features: []
  }

  @action
    closePopup() {
      this.showPopup = false;
      this.isUpdate = false;
      this.pointFields = initialPointVal;
    }

  @action
     mapClicked({ target: map, point, lngLat }) {
      this.pointFields = initialPointVal;
      this.showPopup = true;
      this.coordinates = {lng: lngLat.lng, lat: lngLat.lat};
    }
  @action
    editPointOnMap(point) {
      this.showPopup = true;
      this.isUpdate = true;
      this.coordinates = {lng: point.longitude, lat: point.latitude}
      this.pointFields = {
        id: point.id,
        name: point.name,
        geometry: { longitude: point.longitude, latitude: point.latitude }
      }
    }

    @action
    async setMarkers () {
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
    async allPoints() {
      this.points = await this.store.findAll('point');
      this.setMarkers();
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
      this.pointFields = initialPointVal;
    }

  @action
    async update() {
      let name = get(this, 'pointFields.name');
      let id = get(this, 'pointFields.id')
      let point = await this.store.findRecord('point', id);
      point.name = name;
      point.geometry = get(this, 'pointFields.geometry');
      await point.save();
      this.updatePoints();
      this.showPopup = false;
     this.isUpdate = false;
     this.pointFields = initialPointVal;
    }

  @action
    async updatePoints() {
      await this.allPoints();
    }

  @action
  async searchPoints(search) {
    this.points = await this.store.query('point',  { name: search });
    this.setMarkers();
  }

}
