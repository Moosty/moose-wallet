import $ from 'jquery';
import './top.less';

/**
 * Contains some of the important and basic information about the account
 *
 * @module app
 * @submodule top
 */
app.component('top', {
  template: require('./top.pug')(),
  controller: class top {
    constructor($scope, Peers, Account, $rootScope) {
      this.peers = Peers;
      this.account = Account;
      this.$rootScope = $rootScope;
      /* $scope.$on('accountChange', () => {
        this.totalSendable = this.account.get().balance > 1e7 ?
          this.account.get().balance - 1e7 : 0;
      }); */
      this.balance = 0;
      this.loadIcoBalance();
    }

    loadIcoBalance() {
      return $.get(`${this.$rootScope.api}/address/status/${this.account.account.address}`)
        .then((resp) => {
          if (resp && resp.totalMoose) {
            this.balance = resp.totalMoose;
          }
        });
    }

    loadTransactions() {
      return $.post(`${this.$rootScope.api}/address/txs`,
        JSON.stringify({ address: this.account.account.address }))
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
  },
});
