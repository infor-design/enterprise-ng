# Infor Design System's Enterprise Components for Angular QuickStart Guide

This quickstart guide demonstrates how to build and run a simple Angular application using the **Enterprise Components for Angular** (**ids-enterprise-ng**).

You can download the latest version of the code from [quickstart](https://github.com/infor-design/enterprise-ng-quickstart.git).

## Prerequisites

If **Node.js** and **npm** are not already on your machine, install them. These examples require Node.js 10.15.0 or higher and NPM 3 or higher. To check which version you are using, run `node -v` and `npm -v` in a terminal window.

This quick start guide uses **@angular/cli** to create, build and run the application.

At the time of writing the version of **@angular/cli** used was 10.0.11 with **angular** 10.0.11.

## Step 0 : Install Pre-Prerequisites

From a command prompt, run:

```sh
npm install -g @angular/cli
```

## Step 1 : Create and Configure the Project

### Create the project folder

Using a terminal/console window, use **@angular/cli** to initialise the project, creating scaffolding for the application (in this case **ids-enterprise-ng-quickstart**):

```sh
ng new ids-enterprise-ng-quickstart
? Would you like to add Angular routing? No
? Which stylesheet format would you like to use? CSS
cd ids-enterprise-ng-quickstart
```

## Step 2 : Install Packages

The project will need access to the Infor NPM registy to be able to pull down the latest Infor Design System (IDS) *enterprise* component libraries for jQuery and Angular.

You can add the dependencies directly into the `project.json` file, however it is more reliable to add them using the command line.

In a terminal window, in the project folder, type

```sh
npm install ids-enterprise-ng -S
```

NOTE: You can also npm link to a local version of the `ids-enterprise-ng` using `npm link`.  If you do this you must add `"preserveSymLinks":true` to the root `angular.json` file, as follows:

```json
"projects": {
    "ids-enterprise-ng-quickstart": {
      "architect": {
        "build": {
          "options": {
            "preserveSymlinks": true,
```

## Step 3 : Configure @angular/cli

The next step is to configure `angular-cli` to include the ids enterprise libraries into the output.

Edit `angular.json`, change the `scripts` elements as follows:

```json
"scripts": [
  "./node_modules/jquery/dist/jquery.js",
  "./node_modules/d3/dist/d3.js",
  "./node_modules/ids-enterprise/dist/js/sohoxi.js"
],
```

Change both the *test* and *build* architecture sections.

Add the `jquery` and `ids-enterprise-typings` types into the `tsconfig.*.json` files.  For example:

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app",
    "types": [
      "jquery"
    ]
  },
  "exclude": [
    "node_modules",
    "src/test.ts",
    "**/*.spec.ts"
  ]
}
```

warning: Don't remove any types already present!

### Step 4 : Enterprise Controls Assets

**@angular/cli** needs to include assets from `node_modules` into the compiled output.

To configure this edit the `angular.json` assets section.

Change the `assets` to include the assets required by the underlying `ids-enterprise` widgets, as follows:

```json
"assets": [
    "src/favicon.ico",
    "src/assets",
    {
      "glob": "**/*",
      "input": "./node_modules/ids-enterprise/dist/css",
      "output": "/assets/ids-enterprise/css"
    },
    {
      "glob": "**/*",
      "input": "./node_modules/ids-enterprise/dist/js/cultures",
      "output": "/assets/ids-enterprise/js/cultures"
    }
]
```

The link in the following to the `src/index.html` file would be the output folder..

```html
<head>
  ...
  <link rel="stylesheet" id="stylesheet" href="/assets/ids-enterprise/css/new-theme.css" type="text/css">
</head>
```

## Step 5 : Making Sure it Works

Run the app to test it.

```sh
ng serve
```

Check you get the default page when you browse to <http://localhost:4200/>.

## Step 6 : Unit Testing

Run the unit tests:

```sh
ng test
```

This will open a Chrome window, and run the tests from there.

## IE11

As of Angular 12 IE 11 is no longer supported. If you plan on using IE11, then you will need to stay on older versions of the components / angular. then it is advisable to include a number of polyfills used to plug holes in IEs JavaScript support.

First, edit `./browsersupport`, enabling ie11 support.

Type `npm install --save classlist.js` to add the classlist package.

## Add the SohoComponentsModule

Edit `src/app/app.module.ts`:

```ts
import { SohoComponentsModule } from 'ids-enterprise-ng';
```

Add ```SohoComponentsModule``` to the imports.

```ts
@NgModule({
  ...
  declarations: [],
  imports: [
    BrowserModule,
    ...,
    SohoComponentsModule
  ]
  ...
)}
```

## Add a SoHoXi Component

Add a button to `app.component.html`, by appending the following code snippet:

```html
<soho-icons></soho-icons>
<button soho-button="icon" icon="alert" (click)="clicked()">{{'Alert' | sohoTranslate}}</button>
```

Add the clicked handler to `app.component.ts`, as follows:

```typescript
public clicked() {
    alert('Clicked me!');
}
```

## Locale Setup

Set the locale path in `app.module.ts`:

```typescript
    useFactory: (locale: string) => () => {
        Soho.Locale.culturesPath = 'assets/ids-enterprise/js/cultures/';
        return Soho.Locale.set(locale).catch(err => log('Error when setting locale. Some translated strings might look off'));
    }
```

NOTE: In the checked in code, the quickstart uses an APP_INITIALIZER to set the locale BEFORE the components are rendered, which is the recommended way of setting and loading locale data.  This allows the locale to be based on the browsers locale, via a service or explicitly in the app.module:

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        SohoLocaleModule,
        SohoButtonModule,
        SohoLocaleInitializerModule,
        SohoComponentsModule
    ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ar-EG'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Run the application

Then from a command line run (you can use `ng serve`):

```sh
npm run start
```

Check you get the button when you browse to <http://localhost:4200/>.

## What Next

Now implement the rest of your application, using the components provided, of which a list can be found [here](??)
