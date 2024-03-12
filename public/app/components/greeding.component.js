// import { mountRootParcel } from 'single-spa';
// import { ParcelConfig, Parcel } from 'single-spa';



// import "../../../node_modules/single-spa-angularjs/lib/parcel.js";

// System.register(['single-spa'], () => {
//     let singleSpa;

//     return {

//     };
// });
System.import('single-spa').then((mountRootParcel, ParcelConfig, Parcel) => {
    
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
// angular.
//   module('AngularDrumMachine', ["single-spa-angularjs"]).
//   component('greetUser', {
//     template: 'Hello, {{$ctrl.user}}!',
//     controller: function GreetUserController() {
//       this.user = 'world';
//     }
//   });