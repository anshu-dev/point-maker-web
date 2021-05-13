import Model, { attr } from '@ember-data/model';

export default class PointModel extends Model {
  @attr('string') name;
  @attr('string') latitude;
  @attr('string') longitude;
  @attr geometry;
  @attr('string') created_by;
}
