import './fee.less';

/**
 * The fee component
 *
 * @module app
 * @submodule fee
 */
app.component('fee', {
  template: '{{$ctrl.text}}',
  bindings: {
    fee: '<',
  },
  controller: class fee {
    constructor($scope, Account, moose, $element) {
      this.account = Account;
      const insufficientFunds = moose.normalize(this.account.get().balance) < this.fee;

      this.text = insufficientFunds ?
          `Not enough MOOSE to pay ${this.fee} MOOSE fee` :
          `Fee: ${this.fee} MOOSE`;

      if (insufficientFunds) {
        $element.addClass('error-message');
      }
    }
  },
});

