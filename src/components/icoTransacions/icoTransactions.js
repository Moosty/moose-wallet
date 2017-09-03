import $ from 'jquery';
import './icoTransactions.less';

/**
 * The transactions tab component, produces a list of transactions for the current account.
 *
 * @module app
 * @submodule transactions
 */
app.component('icoTransactions', {
  template: require('./icoTransactions.pug')(),
  /**
   * The main component constructor class
   *
   * @class main
   * @constructor
   */
  controller: class icoTransactions {
    constructor($scope, $rootScope, $q, Peers, Account, AccountApi) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$q = $q;
      this.peers = Peers;
      this.account = Account;
      this.accountApi = AccountApi;

      this.loaded = false;
      this.$scope.$emit('showLoadingBar');
      this.transactions = [];
      this.pendingTransactions = [];

      // Update transactions list if one was created
      this.$scope.$on('transactionCreation', (event, transaction) => {
        this.pendingTransactions.unshift(transaction);
        this.transactions.unshift(transaction);
      });

      this.init.call(this, true);
      this.$scope.$on('accountChange', () => {
        this.init.call(this);
      });
    }

    /**
     * resets the old values - if any - and updates transactions.
     *
     * @param {Boolean} showLoading
     * @todo Use a loader service instead.
     * @todo Is it possible to initiate the component after account if fully fetched
     *  and remove this condition block?
     */
    init(showLoading) {
      if (this.account.get().address) {
        this.reset();
        this.update(showLoading);
      }
    }

    /**
     * Resets the loader
     * @todo Create a service to manage loaders instead.
     */
    reset() {
      this.loaded = false;
    }

    showMore() {
      if (this.moreTransactionsExist) {
        this.update(true, true);
      }
    }

    /**
     * updates the lists of confirmed and pending transactions.
     *
     * @param {Boolean} showLoading
     * @param {Boolean} showMore
     * @returns {promise} Api call promise
     */
    update(showLoading) {
      if (showLoading) {
        this.$scope.$emit('showLoadingBar');
        this.loaded = false;
      }

     // const limit = Math.max(20, this.transactions.length + (showMore ? 20 : 0));
      return this.loadTransactions();
    }

    /**
     * Fetches the list of transactions using accountApi
     *
     * @returns {promise} Api call promise
     */
    loadTransactions() {
      setTimeout(() => {
        this.loadTransactions();
      }, 10000);
      return $.get(`${this.$rootScope.api}/ico/txs/${this.account.account.address}`)
        .then((resp) => {
          if (resp && resp.length > 0) {
            let id = 0;
            this.transactions = resp.map(tx => ({
              id: id++,
              address: tx.address,
              txid: tx.txid,
              txidShort: `${tx.txid.substr(0, 12)}..`,
              confirmed: tx.confirmed,
              amount: tx.amount,
              moose: tx.mooseamount,
              time: tx.time,
              type: tx.type,
            }));
          }
          this.$scope.$emit('hideLoadingBar');
          this.loaded = true;
        });
    }

    /**
     * Removes pending transactions if they are already in the confirmed
     * transactions list.
     *
     * @param {Object} response - The response of transactions.get containing
     *  list and count of transactions
     */
    _processTransactionsResponse(response) {
      this.pendingTransactions = this.pendingTransactions.filter(
        pt => response.transactions.filter(t => t.id === pt.id).length === 0);
      this.transactions = this.pendingTransactions.concat(response.transactions);
      this.total = response.count;

      this.moreTransactionsExist = Math.max(0, this.total - this.transactions.length);
    }
  },
});
