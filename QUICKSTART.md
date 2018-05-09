# enterprise-ng QuickStart Guide

This quickstart guide demonstrates how to build and run a simple Angular application using the **enterprise-ng** components (**@infor/sohoxi-angular**).

You can download the latest version of the code from [quickstart](http://git.infor.com/scm/soho/sohoxi-angular-quickstart.git).

## Prerequisites

If **Node.js** and **npm** are not already on your machine, install them. These examples require Node 8.11 or higher and NPM 3 or higher. To check which version you are using,
run `node -v` and `npm -v` in a terminal window.

This quick start guide uses **@angular/cli** to create, build and run the application.  

At the time of writing the version of **@angular/cli** used was 6.0.0 with **angular** 6.0.0.

## Step 0 : Install Pre-Prerequisites

From a command prompt, run:

```
npm install -g @angular/cli@6.0.0
```

## Step 1 : Create and Configure the Project

### Create the project folder

Using a terminal/console window, use **@angular/cli** to initialise the project, creating scaffolding for the application (in this case **enterprise-ng-quickstart**):

```
ng new enterprise-ng-quickstart
```

(Note: `ng init` has been removed.)

## Step 2 : Install Packages

The project will need access to the Infor NPM registy to be able to pull down the latest Infor Design Lab *enterprise* component libraries for jQuery and Angular.

The easiest way to achieve this is to create the file `.npmrc` at the root of the project, and edit the file to include:

```
@infor:registry=http://npm.infor.com:4873
```

You can add the dependencies directly into the `project.json` file, however it is more reliable to add them using the command line.
In a terminal window, in the project folder:

1. Type `npm install jquery@3.1.1 -S`
2. Type `npm install @infor/sohoxi@4.6.0 -S`
3. Type `npm install @infor/sohoxi-angular@4.6.0 -S`
4. Type `npm install @types/jquery@3.2.16", -D`
5. Type `npm install merge-stream -D`

This includes all the packages we need to create this simple quickstart application.

## Step 3 : Configure @angular/cli

The next step is to configure angular-cli to include the IDL enterprise libraries into the output.

Edit `.angular-cli.json`, change the `scripts` as follows:
```json
"scripts": [
  "../node_modules/jquery/dist/jquery.js",
  "../node_modules/@infor/sohoxi/dist/js/sohoxi.js",
  "../node_modules/@infor/sohoxi/dist/js/cultures/en-US.js",
  "../node_modules/@infor/sohoxi/dist/js/d3.v4.js"
],
```

### Step 4 : Configure TypeScript:

Edit `src/tsconfig.app.json`, update/add the `types` property:
```json
"types": [
  "jasmine",
  "jquery",
  "node"
]
```
Also, add `node_modules/@infor/sohoxi-angular/index.ts` to the `include` property, as follows:
```json
"include": [
  "src/**/*",
  "node_modules/@infor/sohoxi-angular/index.ts"
]
```

This is required as the compiler will not compile code outside the src source folder by default.
## Step 5 : Enterprise Controls Assets
**@angular/cli** needs to include assets from node_modules into the compiled output.

To configure this edit the `angular-cli.json` assets section.
```
  "assets": [
    { "glob": "**/*", "input": "../node_modules/@infor/sohoxi/dist/css", "output": "./assets/sohoxi/css" }
  ],
```
The link in the following to the `src/index.html` file would be the output folder..
```
<head>
  ...
  <link rel="stylesheet" id="stylesheet" href="/assets/sohoxi/css/light-theme.css" type="text/css">
</head>
```

## Step 6 : Making Sure it Works
Run the app to test it.
```ng serve```
Check you get the default page when you browse to http://localhost:4200/.

## Step 7 : Unit Testing
Edit the file `karma.conf.js`, adding any extra JavaScript libraries to the file property, for example:
```json
files: [
 { pattern: './node_modules/jquery/dist/jquery.js', watched: false  },
 { pattern: './node_modules/@infor/sohoxi/dist/js/sohoxi.js', watched: false },
 { pattern: './node_modules/@infor/sohoxi/dist/js/cultures/en-US.js', watched: false },
 { pattern: './src/test.ts', watched: false }
],
```
Run the unit tests:
```
ng test
```
This will open a Chrome window, and run the tests from there.

## Add polyfills

If you plan on using IE11, then it is advisable to include a number of polyfills used to plug holes in IEs JavaScript support.

Edit the file `src/polyfills.js`, and uncomment all the import lines below

```typescript
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/weak-map';
import 'core-js/es6/set';

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
import 'classlist.js';  // Run `npm install --save classlist.js`.
```

Type `npm install --save classlist.js` to add classlist package.

## Add the SohoComponentsModule
Edit `src/app/app.module.ts`:
```typescript
import { SohoComponentsModule } from '@infor/sohoxi-angular';
```
Add ```SohoComponentsModule``` to the imports.

```typescript
@NgModule({
  ...
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SohoComponentsModule
  ]
  ...
)}
```

## Add a SoHoXi Component

Add a button to `app.component.html`, by appending the following code snippet:
```
<button soho-button (click)="clicked()">Click Me!</button>
```
Add the clicked handler to `app.component.ts`, as follows:
```typescript
public clicked() {
    alert('Clicked me!');
}
```

Then from a command line run (you can use `ng serve`):
```
npm run start
```
Check you get the button when you browse to http://localhost:4200/.

# What Next

Now implement the rest of your application, using the components provided, of which a list can be found [here](??)
