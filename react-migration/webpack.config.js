const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "Bruno",
    projectName: "react-migration",
    webpackConfigEnv,
    argv,
  });
  console.log(defaultConfig);
  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    entry: {
      rootComponente: '/Users/brunomoretto/Local Documents/single-spa-tutorials/angularjs-starter/angularJS-migrating-to-single-spa-starter/react-migration/src/Bruno-react-migration',
      someOtherComponente: '/Users/brunomoretto/Local Documents/single-spa-tutorials/angularjs-starter/angularJS-migrating-to-single-spa-starter/react-migration/src/some-other-componente-migration'
    },
    output: {
      filename: '[name].js'
      // libraryTarget: 'umd',
      // library: 'ReactMigration'
    }
  });
};
