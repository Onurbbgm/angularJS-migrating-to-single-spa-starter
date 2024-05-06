const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "Bruno",
    projectName: "react-migration",
    webpackConfigEnv,
    argv,
  });
  defaultConfig.externals = [];
  const publicPath = process.env.NODE_ENV === 'development' ? 'http://localhost:9000/' : 'ENVIRONMENT_PUBLIC_URL';
  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    output: {
      publicPath: publicPath, //This will be replace in the serve.js
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
