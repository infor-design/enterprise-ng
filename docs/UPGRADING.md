# Angular Package Format

The npm package for the IDS Enterprise Angular components (`ids-enterprise-ng`) has been converted into a compiled package (using the [Angular Package Format][APF])

For information on how to create these libraries, see [Creating A Library]<https://blog.angularindepth.com/creating-a-library-in-angular-6-87799552e7e5>.

## Component Library Consumers

Consuming the new package will require some changes to projects including this package.

These steps assume you will be running the latest `@angular/cli` and `@angular/core` package. It is recommended that you review the information on <http://update.anguar.com> before updating.

```sh
npm install @angular/cli -g
npm install @angular/cli
ng update @angular/cli
ng update @angular/core
```

You will need to fix any issues, as these often depend on the dependency tree created by the packages you use and what version you are upgrading from.

```sh
npm install ids-enterprise@4.10.0@dev -S
npm install ids-enterprise-ng@4.10.0@dev -S
```

In the `tsconfig.ts` and `src/tsconfig.*.ts` files of your project, remove the compilation of the older `ids-enterprise-ng` package (if present).

```json
"include": [
    "src/**/*",
    "./node_modules/ids-enterprise-ng/**/*"
]
```

Remove `"./node_modules/ids-enterprise-ng/**/*"` from the include section.

## Component Library Developers

For those working on the `ids-enterprise-ng` components, the layout of the project has changed.  The `ids-enterprise-ng` library has been moved into the projects folder as a library.  This allows the controls to be published in a pre-compiled format.  The demo applications is still hosted in the root `src` folder, but references the components via the from the library project.  There are several new commands require to build the library, mainly to build, test and publish the library.

To build just the library:

```sh
npm run build:lib (ng build ids-enterprise-ng --prod)
```

To build just the app (requires the library to have been built already)

```sh
npm run build:app (ng build)
```

To build both:

```sh
npm run build (ng build ids-enterprise-ng --prod && ng build
```

Testing the library is as follows:

```sh
npm run  test:lib (ng test ids-enterprise-ng)
```

Testing the app is as follows:

```sh
npm run test:app (ng test)
```

Debugging works as before, however you may need to enable vendor library source maps which are disable by default.

```sh
ng serve --source-map --vendor-source-map
```

You can also set this in the angular.json file, under "options".

```json
"vendorSourceMap": true,
```

[#APF]: <https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit>
