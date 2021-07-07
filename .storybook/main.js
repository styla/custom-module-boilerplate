const path = require('path');

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  core: {
    builder: "webpack5"
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        typeRoots: ["./types"],
      },
    }
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.handlebars$/,
      use: ['handlebars-loader'],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
}
