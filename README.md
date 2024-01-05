# Styla Custom Module Boilerplate

This repository is a boilerplate for the development of a [Styla Custom Module](https://documentation.styla.eu/).

It offers the following set of features:
- **Completely encapsulated sandbox**: no need to run additional services or to upload files to an external host.
- **Live preview**: we are using [Storybook](https://storybook.js.org/) to render the module preview in real-time.
- **Test with different content and settings**: everything that is defined in `schema.json` will be rendered in the Storybook interface as customizable controls. This will allow you to test your module in different scenarios, as you would do when the module is included in a Styla shop.
- **Use Sass for styling**: we support Sass for writing the module CSS. At build time we will then automatically compile, minify and include the styles as part of the handlebars file.
- **Use Typescript for the client facing code**: If your module also requires JS code to be executed on the client, you can use Typescript for a more resilient and maintainable code. It will be converted to JS by us at build time.


## How to launch
- Clone this project in your machine: `git clone https://github.com/styla/custom-module-boilerplate.git`
- Make sure that [yarn](https://classic.yarnpkg.com/lang/en/docs/install/) is installed on your machine
- Install all the project dependencies by running: `yarn`
- Start the service with: `yarn start`
- Your browser should open automatically. If not, open: http://localhost:6006/ 
- By default you will see the introduction page (containing these instructions). On the left sidebar click on `DeveloperSandbox` to see the demo module preview.

![Demo Module Preview](https://static-cdn.styla.com/custom-modules-demo/screenshot.png)

## Demo Module
The demo module has the purpose of showcasing some of the Custom Modules features. It's a sample shop header, with customizable options. Tweaking these options (in the Controls section) will directly affect the live preview of the module.

## Write your own module
We recommend to use the Demo module as a starting point for your implementation.
In the following table we will recap the existing files and their role:

| File Path                 | Description                                                                                                     |
| --------------------------| --------------------------------------------------------------------------------------------------------------- |
| `src/schema.json`         | JSON file containing all the content/settings options of the module.                                            |
| `src/template.handlebars` | Defines the HTML structure of the module and allows the usage of dynamic options, thanks to Handlebars support. |
| `src/index.ts`            | Typescript file which contains all the JS logic that will be executed on the client side.                       |  
| `src/scss/styles.scss`    | Sass file containing all the styles of the module.                                                              |


Feel free to alter any of those files, and the live preview will update reflecting your changes.

### Implementation notes
- The `index.ts` file is not necessary, since the module can be entirely implemented with Handlebars + CSS (depending on the requirements). In that case we suggest to keep the file and just leave its content empty. This will avoid potential issues during the build process.
- Using the Sass file is also not necessary. Using inline styles or a `<style>` block in the Handlebars file is also supported. The advantage of using Sass however is that these styles will be minified.
- In case you need to use dynamic setting values in CSS, these definitions need to be in the Handlebars file. We don't support, in fact, the usage of Handlebars variables inside the Sass file. The existing Demo Module contains an example of this (check the `logoContainer` element).


## Export the module
Once your module is ready, it can be exported so that it can be uploaded on your host and configured for usage inside a Styla shop.
In order to export the module:
- Run `yarn build`
- A `build` directory should appear at the root of the project. Check the content of `build/src`:
   - index.js
   - schema.json
   - template.handlebars
- These are the production ready files that can be uploaded in your host / S3 bucket / etc.

Your Custom Module is now ready to be used in Styla! 🎉

## Troubleshooting
If something is not working feel free to reach out to us or [open an issue](https://github.com/styla/custom-module-boilerplate/issues) in our Github repository.
