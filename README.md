# webpack-skeleton

This is the webpack skeleton

Please check out this project and do the following commands:

```
  npm install
  npm run start
```

This will start a server on port 8080 that will server index.html

## How to make a component

To make a developer's job easier, we have *four* different types of code generators to help you make your components.  THe skeleton code for each of these components can be generated using:

```
  npm run generate:<component-type> <ComponentName>`.
```

For example, if you want to create a Stateful React Component named HeroCarousel, you would execute the following:

```
  npm run generate:stateful HeroCarousel`.
```

Here are details of the different types of components you can gererate skeleton code for:

- **Smart (Stateful) React Component:**
  - React components that keep state.  Best for Higher Order Components / Components that have a backend equivalent.
  - `npm run generate:stateful <ComponentName>`
  - Note that after you generate the code, you must follow the instructions to add the loader to `src/js/components/loaders.js`.  This is important if you want to make sure the framework recognizes this correctly.
- **Dumb (Stateless) React Component:**
  - For components that are being controlled by Smart React Components.
  - `npm run generate:stateless <ComponentName>`
- **React Sub Component:**
  - Useful if you want to have a component be a subcomponent of another (e.g. curerently in the frameowrk, all form elements being subcomponts of `Form`)
  - `npm run generate:sub <ComponentName>`
- **Vanilla Component:**
  - Components that don't rely on React.
  - `npm run generate:vanilla <ComponentName>`


If you would like to make templates for other types of components:

1. Create a new XML file inside the `/templates` directory.  Take a look at the XML files for the above generators to get the idea how to set it up
2. Update `package.json` to create a new target inside the `scripts` property.
3. If you need to change the script that generates the code, it is `bin/codeGenerator`.

### Inserting a High Level React Component into the page.

If you take a look at `index.html`, you will see that we can add a component (e.g. Switch) to the page by using the following HTML code:

```
    <!--
        The FE component's root HTML. Our framework looks for the data-component attribute for
        the name of the FE component so it can load it only as needed. The data-props-id
        attribute points to the script tag below it needs to get props.
    -->
    <div id="my-switch" data-component="Switch" data-props-id="switch-props">

    <!--
        These are the props for the above component, pointed to by the id 
    -->
    <script id="switch-props" type="application/json">
    {
        "id": "speaker-power",
        "labels": {
            "off": "off",
            "on": "on",
            "main": "Speaker power"
        }
    }
    </script>


```

If you would rather have a JSON call to gather the props of a component:
```
    <div id="hero" data-component="Switch" data-props-remote="http://localhost:80/tmp/test.json" data-use-remote="true"></div>
```

## Running a build

```
npm run build
```

Note that the `dist` directory will contain the following files:

- __vendors~app.bundle.js:__ All front-end third party libraries that have been installed using `npm install` needed for the base application.
- __app.bundle.js:__  the base file for the application.
- __polyfills.bundle.js__ All the pollyfills used by the application.
- __images.bundle.js__ Needed for all static images listed in `module.export.entry.global.images`.  This file is only for getting static images not referred to in js files, and this entrypoint can be removed prior to site launch.
- __vendors~*bundle.js files:__ All the third party library code shared between different components. For example, `vendors~Carousel~Hero.bundle.js` will have third party library code shared between the `Carousel` and `Hero` components.
- __*~*.bundle.js files:__ All of our custom shared code between components (e.g. `Plp~Hero.bundle.js`) has code shared between the Plp and Hero components.
- __*.bundle.js files:__ Code for a specific component (e.g. `BackToTop.bundle.js` has the code for the BackToTop component)
- __global.css:__ All global styles that need to be loaded at the beginning.  Note this should in the head of the document template.
- __Other *.css files__ Component style sheets (e.g. `Hero.css` will be the styles just for the Hero component)
 
## Running on the server

To build the server side rendering piece:

```
npm run webpack:server
```

The server side code will be placed inside `dist/server/server.js`.

In order for this to work, you need to register the component in `src/js/components/renderers.js`.  For example, if you are including the `LazyLoadingDemo` component for server side rendering

* include this in the `renderers.js` file:

```  
    components.LazyLoadingDemo = props => {
        const Map = require('./LazyLoadingDemo').default;
        return renderReactComponentToString(Map, props);
    };
```
* run the following code in node:

```
    $ node

    > let z = require('./dist/server/server.js');
    undefined

    > z.default.renderServer('LazyLoadingDemo');
```

Note that there is a node script in `src/server/renderComponent.js` that you
can use to test the rendering of a component that is set up to be rendered
server-side:

```
renderComponent.js <component-name>
```

## Styling on different breakpoints

* Note that this project uses the bootstrap grid system.  Please use their classes to lay things out in columns (e.g. `col-12`, `col-md-4`, etc).
* To style different breakpoints, please use the following SASS functions (the paramter can be one of the bootstrap
breakpoints: 'xs', 'sm' 'md', 'lg' or 'xl'):

```
    @include breakpoint-screen-up('lg') {
    ...
    }

    @include breakpoint-screen-down('lg') {

    }
```
* This project uses a responsive font system.  If, in your CSS, you want to size fonts to 14px, 20px, 25px, and
  40px at the xs, sm, md and lg breakpoints respectively, use the following code:
  ```
  .my-component {
    @include responsive-font-size('font-size', 14px, 20px, 25px, 40px);
  }
  ```
  This will generate CSS that will ensure the font sizes are as stated above when the viewport width is at `$breakpoints.xs.average`, `$breakpoints.sm.average`, `$breakpoints.md.average` and `$breakpoints.lg.average` (where `$breakpoints` is defined in `src/styles/shared/_variables.scss`).  When resizing the viewport outside of these widths, the browser should grow/shrink the font within the viewport accordingly.

## Accessibility Concerns
* Do not use CSS `order` to rearrange DOM nodes at different breakpoints.  The reading order of screen readers (which is always the way they appear in the DOM), and since CSS `order` will make the visual order not match the DOM order, it breaks WCAG A (guideline [2.4.3](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-order.html) specifically)
* To create additional styles when a user zooms text, please use the following code design pattern ([more information is about this pattern](https://www.useragentman.com/blog/2019/05/26/how-to-style-resized-text-and-quickly-fix-wcag-1-4-4-issues/)):

```
    .my-component {
        // height for the component without text zooming
        height: 100px;

        .has-text-zoom & {
            // height for the component when text zooming is on:
            height: 300px;
        }
    }
```