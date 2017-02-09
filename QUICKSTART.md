# SoHoXi-Angular QuickStart Guide

This quickstart guide demonstrates how to build and run a simple Angular application using the SoHoXi Angular Component package (**@infor/sohoxi-angular**).

You can download the latest version of the code from [quickstart](http://git.infor.com/scm/soho/sohoxi-angular-quickstart.git).

## Prerequisites

If **Node.js** and npm aren't already on your machine, install them. These examples require Node 4 or higher and NPM 3 or higher. To check which version you are using,
run `node -v` and `npm -v` in a terminal window.

This quick start guide uses **@angular/cli** to create, build and run the application.  

At the time of writing the version of **@angular/cli** used was 1.0.0-beta.30.

In addition, **gulp** is used to perform additional build and deployment steps required to get the application built.

## Step 0 : Install Pre-Prerequisites

From a command prompt, run:

```
npm install -g @angular/cli@latest
npm install -g gulp@latest
```

## Step 1 : Create and Configure the Project

### Create the project folder

Using a terminal window, create a new folder, called `sohoxi-angular-quickstart`.
```
mkdir sohoxi-angular-quickstart
cd sohoxi-angular-quickstart
```

### Create configuration files

In the same terminal window, use **@angular/cli** to initialise the project creating scaffolding for your application:

```
ng init
```

## Step 2 : Install Packages

The project will need access to the Infor NPM registy to be able to pull down the latest *SohoXI* component libraries for jQuery and Angular. 

The easiest way to achieve this is to create the file `.npmrc` at the root of the project, and edit the file to include:

```
@infor:registry=http://npm.infor.com:4873
```

You can add the dependencies directly into the `project.json` file, however it is more reliable to add them using the command line. 
In a terminal window, in the project folder:

1. Type `npm install jquery@3.1.1 -S` 
2. Type `npm install gulp -S`
3. Type `npm install @types/jquery -S`
4. Type `npm install @infor/sohoxi@4.2.5-develop -S` 
5. Type `npm install @infor/sohoxi-angular@4.2.5-develop -S` 

This includes all the packages we need to create this simple quick start application.

## Step 3 : Configure @angular/cli

The next step is to configure angular-cli to include the SohoXI libraries into the output. 

Edit `angular-cli.json`, change the  `scripts` as follows:
```json
"scripts": [
"../node_modules/jquery/dist/jquery.js",
"../node_modules/@infor/sohoxi/dist/js/sohoxi.js",
"../node_modules/@infor/sohoxi/dist/js/cultures/en-US.js"
],
```
## Step 4 : Configure TypeScript:

Edit `src/tsconfig.json`, add this below the `typeRoots` property:
```json
"types": [
  "jasmine",
  "jquery",
  "node"
]
```
## Step 5 : SoHoXI Assets
Angular-CLI is currently not capable of automatically copying assets from dependencies in node_modules.
The easiest way to overcome this is to add a prebuild step which can be run as part of 
npm.  This example uses **gulp** to copy the assets from the sohoxi folder into the src/assets folder of the 
application. 

Create a gulpfile.js file in the root of your project, consisting of the following:
```typescript
var gulp = require('gulp');

gulp.task("copy-assets", function () {
    return gulp
        .src('./node_modules/@infor/sohoxi/dist/css/*theme.css*')
        .pipe(gulp.dest('./src/assets/css'))
});
```
Then run:
```
gulp copy-assets
```
You can also include this in the build (and start) scripts included in the package.json file, for example:

```json
"start": "gulp copy-assets && ng serve",
``` 

Add the following to the `src/index.html` file:

```
<head>
  ...
  <link rel="stylesheet" id="stylesheet" href="/assets/css/light-theme.css" type="text/css">
</head>
```

## Step 6 : Making Sure it Works
Run the app to test it.
```ng serve``` 
Check you get the default page when you browse to http://localhost:4200/.

## Step 7 : Unit Testing
Edit the file karma.conf.js, adding any extra JavaScript librariesto the file property, for example:
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
<button soho-button (click)="clicked($event)">Click Me!<button>
```
Add the clicked handler to `app.component.ts`, as follows:
```typescript
public clicked() {
    alert('Clicked me!');
}
```

Then from a command line run (you can use `ng serve` but that wont copy the assets):
```
npm run start
```
Check you get the button when you browse to http://localhost:4200/.

# What Next

Now implement the rest of your application, using the components provided, of which a list can be found [here](??)
