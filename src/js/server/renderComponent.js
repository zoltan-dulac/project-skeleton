#!/usr/bin/env node

/*
 * This is a node script to test the rendering of a component. It should
 * be run at the command line.  Usage is:
 *
 * renderComponent.js <component-name>
 */

/* eslint-disable no-console */

const { argv } = process;
const args = argv.length - 1;
const path = require('path');
const filename = path.basename(__filename);


if (args !== 2) {
  console.error(`Usage: ${filename} <component-name>`);
  return;
}

const z = require('../../../dist/server/server.js');

try {
  console.log(z.default.renderServer(argv[2]));
} catch (ex) {
  console.log(`${argv[2]} doesn't seem to be a component.`);
  console.log(ex);
}
