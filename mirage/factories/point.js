import { Factory } from 'ember-cli-mirage';

export default Factory.extend({

  id(i) {
    return i;
  },

  name(i) {
    return `Point ${i}`; // Movie 1, Movie 2, etc.
  },

  latitude(i) {
    return -96.666333 + i;
  },

  longitude(i) {
   return 32.666333 + i; 
  }

});