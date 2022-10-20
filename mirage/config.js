export default function () {
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get('/users');
  this.get('/users/:id');
  this.post('/users');
  this.put('/users/:id');

  this.get('/bikes');
  this.get('/bikes/:id');
  this.post('/bikes');
  this.put('/bikes/:id');
  this.delete('/bikes/:id');

  this.get('/orders');
  this.get('/orders/:id');
  this.post('/orders');
  this.put('/orders/:id');

  this.get('/issues');
  this.get('/issues/:id');
  this.post('/issues');
  this.put('/issues/:id');
}
