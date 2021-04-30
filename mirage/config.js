export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

   this.urlPrefix = 'https://point-maker-api.herokuapp.com';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

     // Shorthand cheatsheet:

    this.get('/points');
    this.post('/points');
    this.get('/points/:id');
    this.put('/points/:id'); // or this.patch
    this.del('/points/:id');

   // https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
}
