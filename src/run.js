import $ from 'jquery';
/**
 * @function run
 *
 * @description The application state method.
 */
app.run(($rootScope, $timeout, $state, $transitions, $mdDialog, Peers, Account, Sync) => {
  $rootScope.api = 'https://iconet.moosecoin.io';
  $rootScope.iconet = true;
  $rootScope.peers = Peers;
  Sync.init();

  $transitions.onStart({ to: '*' }, () => {
    $mdDialog.cancel();
  });

  $rootScope.reset = () => {
    $timeout.cancel($rootScope.timeout);
  };

  $rootScope.currencies = $.get(`${$rootScope.api}/status/currencies`);

  $rootScope.logout = () => {
    $rootScope.reset();
    Peers.reset(true);

    $rootScope.logged = false;
    $rootScope.$emit('hideLoadingBar');
    Account.reset();

    $state.go('login');
  };
});
