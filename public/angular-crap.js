const app = angular.module('angularApp', []);

class MainController {
  renderReact() {
    window.renderApp();
  }
}

app.controller('MainController', MainController);
