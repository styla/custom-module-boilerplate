const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  core: {
    builder: 'webpack5'
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        typeRoots: ['./types'],
      },
    }
  },
  webpackFinal: async (sbWebpackConfig) => {
    /**
    sbWebpackConfig.module.rules.push({
      test: /\.handlebars$/,
      use: ['handlebars-loader'],
      include: path.resolve(__dirname, '../src'),
    });
    */

    // TODO: this fails horribly
    sbWebpackConfig.module.rules.push({
      test: /\.handlebars$/,
      use: ['raw-loader'],
      include: path.resolve(__dirname, '../src'),
    });

    sbWebpackConfig.resolve = Object.assign({}, sbWebpackConfig.resolve, {
      fallback: {
        fs: false,
        path: require.resolve('path-browserify'),
        readline: false
      }
    });

    return sbWebpackConfig;
  },
}
