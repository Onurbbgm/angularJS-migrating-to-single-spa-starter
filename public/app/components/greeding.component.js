// import { mountRootParcel } from 'single-spa';
// import { ParcelConfig, Parcel } from 'single-spa';



// import "../../../node_modules/single-spa-angularjs/lib/parcel.js";

// System.register(['single-spa'], () => {
//     let singleSpa;

//     return {

//     };
// });
angular.
  module('AngularDrumMachine').
  component('greetUser', {
    template: '<div id="react-component-container"></div>',
    // controller: function GreetUserController() {
    //   this.user = 'world';
    // }
  });

System.import('single-spa').then((singleSpa) => {
    System.import('@Bruno/react-migration').then((parcelConfig) => {
        // console.log(mountRootParcel);
        singleSpa.mountRootParcel(parcelConfig, {
            domElement: document.getElementById('react-component-container'),
            customProps: {
                name: 'and I am prop called'
            }
        })
    })
});
// System.import<ParcelConfig>('@Bruno/react-single-spa-tutorial')
//       .then((parcelConfig) => {
//         this.parcel = parcelConfig;
//         // Mount the React component
//         this.mountParcel = mountRootParcel(this.parcel, {
//           domElement: document.getElementById('react-component-container')!,
//           customProps: {
//             name: 'I am AngRect the god of frameworks!'
//           }
//         });
//       });

