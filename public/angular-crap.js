const app = angular.module('angularApp', []);

class ReactService {
  constructor() {
    console.log('constructing svc');
    this.manager = new window.ReactAppManager();
    this.manager.renderApp();
    this.store = this.manager.store;
  }
}

app.service('ReactService', ReactService);

class MainController {
  constructor($scope, ReactService) {
    this.$scope = $scope;
    this.ReactService = ReactService;

    this.initialized = true;
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

    this.ReactService.store.subscribe(this.onStateChange);
    this.count = this.ReactService.store.getState().counter.count;
  }

  onStateChange() {
    const newState = this.ReactService.store.getState();
    console.log('New state: ', newState);
    if (this.count !== newState.counter.count) {
      this.$scope.$safeApply(() => {
        this.count = newState.counter.count;
      });
    }
  }

  increment() {
    this.ReactService.store.dispatch({ type: 'increment' });
  }
}

MainController.$inject = ['$scope', 'ReactService'];

app.controller('MainController', MainController);
