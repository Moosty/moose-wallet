import './login.less';

app.component('login', {
  template: require('./login.pug')(),
  controller: class login {

    /* eslint no-param-reassign: ["error", { "props": false }] */

    constructor($scope, $rootScope, $timeout, $document, $mdMedia,
      $cookies, $location, Passphrase, $state, Account, Peers) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$timeout = $timeout;
      this.$document = $document;
      this.$mdMedia = $mdMedia;
      this.$cookies = $cookies;
      this.$location = $location;
      this.$state = $state;
      this.account = Account;
      this.peers = Peers;

      this.Passphrase = Passphrase;
      this.generatingNewPassphrase = false;
      this.$rootScope.loggingIn = false;

      this.networks = [{
        name: 'ICO network',
        iconet: true,
        port: 4460,
        address: 'https://iconet.moosecoin.io',
      }];

      this.network = this.networks[0];

      this.validity = {
        url: true,
      };

      this.$scope.$watch('$ctrl.input_passphrase', val => this.validity.passphrase = this.Passphrase.isValidPassphrase(val));
      this.$scope.$watch('$ctrl.network.address', (val) => {
        try {
          const url = new URL(val);
          this.validity.url = url.port !== '';
        } catch (e) {
          this.validity.url = false;
        }
      });

      this.$timeout(this.devTestAccount.bind(this), 200);

      /**
       * @todo Move this after creating the dialog service
       */
      this.$scope.$watch(() => this.$mdMedia('xs') || this.$mdMedia('sm'), (wantsFullScreen) => {
        this.$scope.customFullscreen = wantsFullScreen === true;
      });
    }

    /**
     * Called of login/sign-up form submission. this is where we set the active peer.
     *
     * @param {String} [_passphrase=this.input_passphrase]
     */
    passConfirmSubmit(_passphrase = this.input_passphrase) {
     // if (this.network.iconet) {
      this.$rootScope.loggingIn = true;
      this.$scope.$emit('showLoadingBar');
      if (this.Passphrase.normalize.constructor === Function) {
        this.peers.setActive(this.network).then(() => {
          this.$rootScope.loggingIn = false;
          this.$scope.$emit('hideLoadingBar');
          if (this.peers.online) {
            this.account.set({
              passphrase: this.Passphrase.normalize(_passphrase),
              network: this.network,
            });
            this.$cookies.put('network', JSON.stringify(this.network));
            this.$state.go(this.$rootScope.landingUrl || 'main.icoTransactions');
          }
        });
      }
      // } else {
      //   // ico login
      //   this.$rootScope.loggingIn = true;
      //   this.$scope.$emit('showLoadingBar');
      //   this.account.set({
      //     passphrase: this.Passphrase.normalize(_passphrase),
      //     network: this.network,
      //   });
      //   this.$cookies.put('network', JSON.stringify(this.network));
      //   this.$scope.$emit('hideLoadingBar');
      //   this.$state.go(this.$rootScope.landingUrl || 'main.icoTransactions');
      // }
    }

    devTestAccount() {
      const peerStack = this.$location.search().peerStack || this.$cookies.get('peerStack');
      if (peerStack === 'localhost') {
        this.network = this.networks[2];
        angular.merge(this.network, {
          address: 'http://localhost:4000',
          testnet: true,
          nethash: '198f2b61a8eb95fbeed58b8216780b68f697f26b849acf00c8c93bb9b24f783d',
        });
      } else if (peerStack === 'testnet') {
        this.network = this.networks[1];
      }
      const passphrase = this.$location.search().passphrase || this.$cookies.get('passphrase');
      if (passphrase) {
        this.input_passphrase = passphrase;
      }
    }
  },
});
