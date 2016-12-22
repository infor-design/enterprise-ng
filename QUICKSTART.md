# SohoXi QuickStart Guide

This QuickStart guide demonstrates how to build and run a simple Angular application using the SohoXi component package (**@infor/sohoxi-angular**).

You can download the latest version from [quickstart](http://git.infor.com/scm/soho/sohoxi-angular-quickstart.git).

## Prerequisites

If **Node.js** and npm aren't already on your machine, install them. These examples require node v4.x.x or higher and npm 3.x.x or higher. To check which version you are using, run `node -v` and `npm -v` in a terminal window.

This quick start guide uses **Angular-CLI** to create, build and run the application.  
At the time of writing the version of angular-cli used was 1.0.0-beta-22-1.

In addition, **gulp** is used to perform additional build and deployment steps required to get the application built.

## Step 1 : Create and Configure the Project

### Create the project folder

Using a terminal window, create a new folder, called `sohoxi-angular-quickstart`.
```
mkdir sohoxi-angular-quickstart
cd sohoxi-angular-quickstart
```

### Create configuration files

In the same terminal window, use angular-cli to initialise the project creating scaffolding for your application:

```
ng init
```

## Step 2 : Install Packages

The project will need access to the Infor NPM registy to be able to pull down the latest *SohoXI* component libraries for jQuery and Angular. 
The easiest was to achieve this is to create the file `.npmrc` at the root of the project, and edit the file to include:

```
@infor:registry=http://npm.infor.com:4873
```

You can add the dependencies directly into the `project.json` file, however it is more reliable to add them using the command line. 
In a terminal window, in the project folder:

1. Type `npm install –save jquery@3.1.1` 
2. Type `npm install –save @types/jquery`
3. Type `npm install –save @infor/sohoxi@4.2.4-develop` 
4. Type `npm install –save @infor/sohoxi-angular@4.2.4-develop` 

This includes all the packages we need to create this simple quick start application.

## Step 3 : Configure Angular CLI

The next step is to configure angular-cli to include the SohoXI libraries into the output. 

Edit `angular-cli.json`, change the  `scripts` as follows:
```json
"scripts": [
"../node_modules/jquery/dist/jquery.js",
"../node_modules/@infor/sohoxi/dist/js/sohoxi.js",
"../node_modules/@infor/sohoxi/dist/js/cultures/en-US"
],
```
## Step 4 : Configure TypeScript
Edit `src/tsconfig.json`, add this below the `typeRoots` property:
```json
"types": [
  "jasmine",
  "jquery",
  "node"
]
```
## Step 5 : SohoXI Assets
Angular-CLI is currently not capable of automatically copying assets from dependencies in node_modules.
The easiest way to overcome this is to add a prebuild step which can be run as part of 
npm.  This example uses **gulp** to copy the assets from the sohoxi folder into the src/assets folder of the 
application. 

Create a gulpfile.js file in the root of your project, consisting of the following:
```typescript
var gulp = require('gulp');

gulp.task("copy-assets", function () {
    return gulp
        .src('./node_modules/@infor/sohoxi/dist/css/**/*.css')
        .pipe(gulp.dest('./src/assets/css'))
});
```
Then run:
```
gulp copy-assets
```
You can also include this in the build (and start) scripts included in the project.json file, for example:

```json
"start": "gulp copy-assets && ng serve",
``` 
## Step 6 : Making Sure it Works
Run the app to test it.
```ng serve``` 
Check you get the default page when you browse to http://localhost:4200/.
## Add the SohoComponentsModule
Edit `src/app/app.module.ts`:
```typescript
import { SohoComponentsModule } from '@infor/sohoxi-angular';
```
Add ```SohoComponentsModule``` to the imports. 

Add SohoComponentsModule to the imports.
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

## Add a SohoXi Component 

Add a button to `app.component.html`, by appending the following code snippet:
```
<button soho-button>Click Me!<button>
```
Then from a command line run (you can use `ng serve` but that wont copy the assets):
```
npm run start
```
Check you get the button when you browse to http://localhost:4200/.

# What Next

Now implement the rest of your application, using the components provided, of which a list can be found [here](??)
