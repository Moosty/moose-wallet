import './moose.less';

/**
 * The moose component showing the amount and unit of the transaction
 * This component adds the unit and it just needs the raw amount
 *
 * @module app
 * @submodule moose
 */
app.component('moose', {
  template: require('./moose.pug')(),
  bindings: {
    amount: '<',
  },
  /**
   * The moose component constructor class
   *
   * @class moose
   * @constructor
   */
  controller: class moose {
    constructor($attrs) {
      this.append = typeof $attrs.append !== 'undefined';
    }
  },
});
