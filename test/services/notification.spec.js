const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const expect = chai.expect;
chai.use(sinonChai);

describe('Factory: Notification', () => {
  let moose;
  let $window;
  let notify;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject((_Notification_, _moose_, _$window_) => {
    moose = _moose_;
    $window = _$window_;
    notify = _Notification_.init();
  }));

  describe('about(data)', () => {
    const amount = 100000000;
    const mockNotification = sinon.spy();

    it('should call this._deposit', () => {
      const spy = sinon.spy(notify, '_deposit');
      notify.isFocused = false;
      notify.about('deposit', amount);
      expect(spy).to.have.been.calledWith(amount);
    });

    it('should call $window.Notification', () => {
      $window.Notification = mockNotification;
      const msg = `You've received ${moose.normalize(amount)} MOOSE.`;

      notify.isFocused = false;
      notify.about('deposit', amount);
      expect(mockNotification).to.have.been.calledWith(
         'MOOSE received', { body: msg },
      );
      mockNotification.reset();
    });

    it('should not call $window.Notification if app is focused', () => {
      notify.about('deposit', amount);
      expect(mockNotification).to.have.been.not.calledWith();
      mockNotification.reset();
    });
  });
});
