import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;
  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      // OAuth 2
      headers['Authorization'] = `Bearer ${this.session.data.authenticated.access_token}`;
    }

    return headers;
  }
  
  host = 'http://127.0.0.1:3000/api';
}
