import Component from '@ember/component';
import jQuery from 'jquery';

export default Component.extend({
  actions: {
    toggle(type) {
      jQuery(this.element)
        .find('ol.toc-level-1.' + type)
        .slideToggle(200);
    },
  },
});
