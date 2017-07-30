import $ from 'jquery';
import './ico.less';
/**
 * This component is a form for transferring funds to other accounts.
 *
 * @module app
 * @submodule send
 */
app.component('ico', {
  template: require('./ico.pug')(),
  bindings: {
    currency: '<',
    payment: '<',
  },
  /**
   * The send component constructor class
   *
   * @class send
   * @constructor
   */
  controller: class ico {
    constructor($scope, moose, dialog, $mdDialog, $q, $rootScope, Account, AccountApi) {
      this.$scope = $scope;
      this.dialog = dialog;
      this.$mdDialog = $mdDialog;
      this.$q = $q;
      this.$rootScope = $rootScope;
      this.account = Account;
      this.accountApi = AccountApi;
      this.currency = {
        value: '',
      };
      this.payment = {};
      this.payment.value = '';
      this.url = '';

      this.$scope.$watch('$ctrl.currency.value', () => {
        this.getAddress();
      });

      this.currencies = $rootScope.currencies;
    }

    /**
     * Get payment address
     *
     * @method getAddress
     */
    getAddress() {
      // request address from genesis api
      if (this.currency.value && this.currency.value !== '-- Select payment currency --') {
        $.post(`${this.$rootScope.api}/address`,
          JSON.stringify({ type: this.currency.value, mooseAddress: this.account.account.address }))
          .then((resp) => {
            if (resp[0]) {
              this.payment.value = resp[0].address;
            } else {
              this.payment.value = resp.address;
            }
            if (this.currency.value === 'btc') {
              this.url = `bitcoin:${this.payment.value}?message=Moosecoin`;
            } else if (this.currency.value === 'eth') {
              this.url = `${this.payment.value}`;
            } else {
              this.url = '';
            }
          });
      }
    }

    /**
     * Get currencies
     *
     * @returns {*}
     */
    getCurrencies() {
      return this.currencies.responseJSON;
    }

    /**
     * Resets the values
     *
     * @method reset
     */
    reset() {
      this.payment.value = '';
    }

    /**
     * Should be called on form submission.
     * Calls transaction.create to send the specified amount to recipient.
     *
     * @method send
     */
    send() {
      this.loading = true;
    }

    /**
     * Cancels the dialog.
     *
     * @method cancel
     */
    cancel() {
      this.reset();
      this.$mdDialog.cancel();
    }
  },
});
