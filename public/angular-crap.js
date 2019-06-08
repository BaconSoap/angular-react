const app = angular.module('angularApp', []);

class MainController {
  constructor($scope) {
    this.initialized = false;
    this.onStateChange = this.onStateChange.bind(this);

    $scope.$safeApply = function (fn) {
      var phase = this.$root.$$phase;
      if (phase == '$apply' || phase == '$digest') {
        if (fn && (typeof (fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    this.$scope = $scope;
  }

  renderReact() {
    this.initialized = true;
    this.store = window.renderApp();
    this.store.subscribe(this.onStateChange);

    console.log(this.store.getState());
    this.count = this.store.getState().counter.count;
  }

  onStateChange() {
    const newState = this.store.getState();
    console.log('New state: ', newState);
    if (this.count !== newState.counter.count) {
      this.$scope.$safeApply(() => {
        this.count = newState.counter.count;
      });
    }
  }

  increment() {
    this.store.dispatch({ type: 'increment' });
  }
}

MainController.$inject = ['$scope'];

app.controller('MainController', MainController);
