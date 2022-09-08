import EmberRouter from '@ember/routing/router';
import config from 'service-booking-ts/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home', { path: '/' }, function () {
    this.route('profile');
    this.route('order', function () {
      this.route('new');
    });
  });
  this.route('login');
  this.route('register');
});
