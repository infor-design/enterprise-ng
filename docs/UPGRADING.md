# Angular Package Format

The npm package for the IDS Enterprise Angular components (`ids-enterprise-ng`) has been converted into a compiled package (using the [APF][#APF])

For information on how to create these libraries, see [Creating A Library][#CAL].

## Component Library Consumers

Consuming the `ids-enterprise-ng` package will require changes to any projects referencing it.

### Upgrade angular and angular/cli

These instructions assume you will be running the latest versions of `@angular/cli` and `@angular/core`. It is recommended that you review the information on <https://update.angular.io> before updating.  Also read <https://next.angular.io/guide/updating-to-version-11> for a detailed description of changes to angular.

Note: The libraries are currently compiled using angular 11, and so require all consumers to use the same major version.

These are the steps for upgrading existing projects:

```sh
npm install @angular/cli@latest
ng update @angular/cli @angular/core
ng update
```

You will need to fix any issues raised, as these will depend on the dependency tree created by the packages you use and what version you are upgrading from.

#### Angular 10 & 11

When updating (and depending on your dependencies) the update *may* not complete, and this is often because one of the referenced packages has a dependency on an older version of TypeScript.  If this is the case, install [TypeScript](https://github.com/infor-design/enterprise-ng/blob/main/package.json#L109) first, as follows:

```sh
npm i typescript@<version>
```

### Install typings as a seperate package

The typings should be install automatically, as they are a dependency of ids-enterprise-ng, if they are not you can install them explicitly as follows:

```sh
npm i ids-enterprise-typings -S
```

These typings must be added to the `types` element of `tsconfig.json`, and where overwridden in child tsconfig files (e.g. `tsconfig.lib.json`).

```json
"types": [
      "jasmine",
      "jquery",
      "node",
      "ids-enterprise-typings"
    ],
```

### Uninstall old dependencies (for code upgrading from a version of ids-enterprise-ng before version 5)

These are now included as part of the ids-enterprise-ng package):

```sh
npm uninstall ids-enterprise -S
npm uninstall jquery -S
npm uninstall @types/jquery -S
npm uninstall d3 -S
npm uninstall @types/d3 -S
```

Install the latest `ids-enterprise-ng` components.

```sh
npm install ids-enterprise-ng@latest -S
```

### Remove compilation (for code upgrading from a version of ids-enterprise-ng before 5)

In the `tsconfig.ts` and `src/tsconfig.*.ts` files of your project, remove the compilation of the older `ids-enterprise-ng` package (if present), for example in:

```json
"include": [
    "src/**/*",
    "./node_modules/ids-enterprise-ng/**/*"
]
```

remove `"./node_modules/ids-enterprise-ng/**/*"` from the `include` section.

### Build / Test / Serve

At this point try building your app, you may want to try the `--prod` option too.

## Component Library Developers

For those working on the `ids-enterprise-ng` components, the layout of the project has changed.  The `ids-enterprise-ng` code has been moved into the `projects` folder.  This allows the controls to be published in a pre-compiled format.  The demo applications is still hosted in the root `src` folder, but now references the components via the library project.  There are several new commands required to build the library, mainly to choose which project to build.

To build the library (`ids-enterprise-ng`):

```sh
npm run build:lib (ng build ids-enterprise-ng --prod)
```

To build the demo app (note: requires the library to have been built already)

```sh
npm run build:app (ng build)
```

To build both library and demo app:

```sh
npm run build (ng build ids-enterprise-ng --prod && ng build)
```

Testing the library is as follows:

```sh
npm run test:lib (ng test ids-enterprise-ng)
```

Testing the demo app is as follows:

```sh
npm run test:app (ng test)
```

Debugging works as before, however you may need to enable vendor library source maps which are disable by default.

```sh
ng serve --source-map --vendor-source-map
```

You can also set this in the `angular.json` file, under "options".

```json
"vendorSourceMap": true,
```

[#APF]: <https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit>
[#CAL]: <https://blog.angularindepth.com/creating-a-library-in-angular-6-87799552e7e5>
