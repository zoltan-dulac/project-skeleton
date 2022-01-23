// This file is used to create the list of components to include in JS builds.


/* eslint-disable no-console */
const components = {};

// enable components
components.Switch = require('components/Switch/loader.js').default;
components.Tooltip = require('components/Tooltip/loader.js').default;
components.Tabs = require('components/Tabs/loader.js').default;
components.SortableTable = require('components/SortableTable/loader.js').default;
components.SpinButton = require('components/SpinButton/loader.js').default;
components.RadioGroup = require('components/RadioGroup/loader.js').default;
components.Checkbox = require('components/Checkbox/loader.js').default;
components.Combobox = require('components/Combobox/loader.js').default;

export default components;
