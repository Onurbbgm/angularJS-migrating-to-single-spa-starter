angular.
  module('AngularDrumMachine').
  component('otherComponent', {
    template: '<div id="react-other-component-container"></div>',
    // controller: function GreetUserController() {
    //   this.user = 'world';
    // }
  });

  System.import('single-spa').then((singleSpa) => {
    System.import('@Bruno/someOtherComponente').then((parcelConfig) => {
        singleSpa.mountRootParcel(parcelConfig, {
            domElement: document.getElementById('react-other-component-container'),
            customProps: {
                caller: 'the other react component'
            }
        })
    })
});