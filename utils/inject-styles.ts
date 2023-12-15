/* eslint-disable @typescript-eslint/ban-ts-comment */

// This script is responsible for:
// - Getting the minified CSS file (which is the result of the Sass file compile)
// - Include this CSS in the head of the original Handlebars file
// - Save the updated Handlebars file in the temp folder, so that it can be used during the build process

// @ts-ignore
import * as fs from 'fs';

const cssFilePath = '_dev_tmp/css/styles.css';
const handlebarsFilePath = 'src/template.handlebars';
const handlebarsBuildPath = 'build/src/template.handlebars';

const cssContent: string = fs.readFileSync(cssFilePath, 'utf-8');

let handlebarsContent: string = fs.readFileSync(handlebarsFilePath, 'utf-8');

handlebarsContent = `<style>${cssContent}</style>\n${handlebarsContent}`;

fs.writeFileSync(handlebarsBuildPath, handlebarsContent);
