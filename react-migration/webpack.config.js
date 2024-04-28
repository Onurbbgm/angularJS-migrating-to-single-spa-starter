const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "Bruno",
    projectName: "react-migration",
    webpackConfigEnv,
    argv,
  });
  defaultConfig.externals = [];
  const publicPath = process.env.NODE_ENV === 'production' ? 'http://localhost:9000/' : 'http://localhost:3000/';
  // console.log(defaultConfig);
  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    // entry: {
    //   rootComponente: '/Users/brunomoretto/Local Documents/single-spa-tutorials/angularjs-starter/angularJS-migrating-to-single-spa-starter/react-migration/src/Bruno-react-migration',
    //   someOtherComponente: '/Users/brunomoretto/Local Documents/single-spa-tutorials/angularjs-starter/angularJS-migrating-to-single-spa-starter/react-migration/src/some-other-componente-migration'
    // },
    // output: {
    //   filename: '[name].js'
    // }
    output: {
      publicPath: publicPath
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'reactMigration',
        filename: 'remoteEntry.js',
        library: { type: 'system' },
        exposes: {
          'RootComponent': './src/Bruno-react-migration',
          'SomeOtherComponent': './src/some-other-componente-migration'
        },
        shared: ['react', 'react-dom', 'single-spa-react']
      })
    ]
  });
};
