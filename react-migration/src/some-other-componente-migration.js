import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import SomeOther from './some-other.component';

const someOtherLifecycles = singleSpaReact({
  React,
  ReactDOM,
  loadRootComponent: (props) => 
    new Promise((resolve, reject) => resolve(() =>
    <SomeOther rootVariables={props.rootVariables}/>)),
  errorBoundary(err, info, props) {
    // Customize the root error boundary for this microfrontend here.
    return <div>Error rendering SomeOther</div>;
  },
});

export const { bootstrap, mount, unmount } = someOtherLifecycles;
