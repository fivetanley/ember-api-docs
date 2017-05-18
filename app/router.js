import Ember from 'ember';
import config from './config/environment';

const { on } = Ember;

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.routerRootURL,

  sendPageViewToGA: on('didTransition', function(page, title) {
    if (typeof FastBoot === 'undefined') {
      page = page ? page : this.get('url');
      title = title ? title : this.get('url');
      const analyticsService = Ember.getOwner(this).lookup('service:analytics');
      analyticsService.trackPage(page, title);
    }
  })
});

Router.map(function() {
  this.route('project', {path: '/:project'});
  this.route('project-version', {path: '/:project/:project_version'}, function() {
    this.route('classes-redirect', {path: '/classes'});
    this.route('namespace', {path: '/namespaces/:namespace'}, itemRoutes);
    this.route('module', {path: '/modules/:module'}, itemRoutes);
    this.route('class', {path: '/classes/:class'}, itemRoutes);

    function itemRoutes() {
      this.route('methods', function() {
        this.route('method', {path: '/:method'});
      });
      this.route('properties', function() {
        this.route('property', {path: '/:property'});
      });
      this.route('events', function() {
        this.route('event', {path: '/:event'});
      });
    }
  });
  this.route('class', {path: '/classes/:class'});
});

export default Router;
