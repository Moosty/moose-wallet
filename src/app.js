/**
 * The main application
 * This is an Angular module to nest all the other sub-modules
 * and also to apply routing.
 *
 * @namespace app
 */
const app = angular.module('app', [
  'ui.router',
  'angular-svg-round-progressbar',
  'ngMessages',
  'ngMaterial',
  'ngAnimate',
  'ngCookies',
  'infinite-scroll',
  'md.data.table',
  'ngclipboard',
  'ja.qr',
])
  .config([
    '$compileProvider', ($compileProvider) => {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|bitcoin|ethereum):/);
    },
  ]);

export default app;
