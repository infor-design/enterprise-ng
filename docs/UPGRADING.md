# Angular Package Format

The npm package for the IDS Enterprise Angular components (`ids-enterprise-ng`) has been converted into a compiled package (using the [APF][#APF])

For information on how to create these libraries, see [Creating A Library][#CAL].

## Component Library Consumers

Consuming the `ids-enterprise-ng` package will require changes to any projects referencing it.

### Upgrade angular and angular/cli

These instructions assume you will be running the latest versions of `@angular/cli` and `@angular/core`. It is recommended that you review the information on <https://update.angular.io> before updating.  Also read <https://update.angular.io/> for a detailed description of changes to angular.

Note: The libraries are currently compiled using angular 13, and so require all consumers to use the same major version.

These are the steps for upgrading existing projects:

```sh
npm install @angular/cli@latest
ng update @angular/cli @angular/core
ng update
```

You will need to fix any issues raised, as these will depend on the dependency tree created by the packages you use and what version you are upgrading from.

#### Angular 16

When updating from angular 16 we were able to do this with the command:

```sh
npx ng update @angular/cli @angular/core
```

No special changes were needed this time.

See <https://blog.angular.io/angular-v16-is-here-4d7a28ec680d> for more information.
As in previous updates you may need a bit more memory.

```sh
export NODE_OPTIONS="--max-old-space-size=8192"
```

#### Angular 15

When updating from angular 14 to 15 we were able to do this with the command:

```sh
npx ng update @angular/cli @angular/core
```

No special changes were needed this time.

See <https://blog.angular.io/angular-v15-is-now-available-df7be7f2f4c8> for more information.
Also check out <https://levelup.gitconnected.com/angular-15-new-must-know-features-ae392a2baf2d>.

As in previous updates you may need a bit more memory.

```sh
export NODE_OPTIONS="--max-old-space-size=8192"
```

#### Angular 14

When updating from angular 13 to 14 we were able to do this with the command:

```sh
ng update @angular/core@14 @angular/cli@14
```

In addition the compiler picked up a few bugs (? on the left hand side) that i had too fix. Also cleaned out the core-js imports from the polyfills since we no longer support IE.

See <https://blog.angular.io/angular-v14-is-now-available-391a6db736af> for more information.

As before we need a bit more memory:

```sh
export NODE_OPTIONS="--max-old-space-size=8192"
```

#### Angular 13

When updating from angular 12 to 13 we were able to do this with the command:

```sh
@angular/cli@13 update @angular/core@13 @angular/cli@13 --force
```

The `--force` part was needed due to a problem with the `@angular-eslint/builder` dependency labels. To ultimately fix this I compared to a new project with `npx ng add @angular-eslint/schematic` and changed all enlist related dependencies

For build caching speed I added:

```sh
  "cli": {
    "cache": {
      "enabled": true,
      "path": ".cache",
      "environment": "all"
    }
  }
```

See <https://blog.angular.io/angular-v13-is-now-available-cce66f7bc296> for more information.

Also on Mac OS I had to run this in the command line as the new NG 13 builds are more intensive.

```sh
# For angular 13 to build
export NODE_OPTIONS="--max-old-space-size=10000"
```

This can be added to `pico ~/.zshrc` or `pico ~/.bashrc`.

#### Angular 12

When updating from angular 11 to 12 we were able to do this with the following command. The `--force` part was needed due to a problem with the `@angular-eslint/builder` dependency labels which will presumably be fixed shortly in NG 12.

```sh
ng update @angular/core@12 @angular/cli@12 --force
```

For proper tree shaking you may need:

```sh
"angularCompilerOptions": {
    "compilationMode": "partial"
  }
```

See <https://angular.io/guide/creating-libraries>, and search for Transitioning libraries to partial-Ivy format.

Also on Mac OS I had to run this in the command line as the new NG 12 builds are more intensive.

```sh
# For angular 12 to build
export NODE_OPTIONS="--max-old-space-size=8192"
```

#### Angular 10 & 11

When updating (and depending on your dependencies) the update *may* not complete, and this is often because one of the referenced packages has a dependency on an older version of TypeScript.  If this is the case, install [TypeScript](https://github.com/infor-design/enterprise-ng/blob/main/package.json#L109) first, as follows:

```sh
npm i typescript@<version>
```

### Install typings as a separate package

The typings should be install automatically, as they are a dependency of ids-enterprise-ng, if they are not you can install them explicitly as follows:

```sh
npm i ids-enterprise-typings -S
```

These typings must be added to the `types` element of `tsconfig.json`, and where overridden in child `tsconfig` files (e.g. `tsconfig.lib.json`).

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

At this point try building your app, you may want to try the `--configuration production` option too.

## Component Library Developers

For those working on the `ids-enterprise-ng` components, the layout of the project has changed.  The `ids-enterprise-ng` code has been moved into the `projects` folder.  This allows the controls to be published in a pre-compiled format.  The demo applications is still hosted in the root `src` folder, but now references the components via the library project.  There are several new commands required to build the library, mainly to choose which project to build.

To build the library (`ids-enterprise-ng`):

```sh
npm run build:lib (ng build ids-enterprise-ng --configuration production)
```

To build the demo app (note: requires the library to have been built already)

```sh
npm run build:app (ng build)
```

To build both library and demo app:

```sh
npm run build (ng build ids-enterprise-ng --configuration production && ng build)
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
