angular.
  module('AngularDrumMachine').
  component('otherComponent', {
    template: '<div id="react-other-component-container"></div>',
    // controller: function GreetUserController() {
    //   this.user = 'world';
    // }
  });

// System.import('single-spa').then((singleSpa) => {
//     System.import('@Bruno/someOtherComponente').then((parcelConfig) => {
//         // Assume 'myApp' is the name of your AngularJS application
//         var appElement = document.querySelector('[ng-app=AngularDrumMachine]');
//         var injector = angular.element(appElement).injector();
//         var $rootScope = injector.get('$rootScope');
//         // var helloText = $rootScope.helloText; 
//         // console.log(helloText)
//         singleSpa.mountRootParcel(parcelConfig, {
//             domElement: document.getElementById('react-other-component-container'),
//             rootVariables: $rootScope
//         })
//     })
// });