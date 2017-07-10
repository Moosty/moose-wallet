/**
 * This filter uses moose factory to normalize the raw value in MOOSE
 *
 * @module app
 * @submodule moose
 */
app.filter('moose', moose => moose.normalize);
