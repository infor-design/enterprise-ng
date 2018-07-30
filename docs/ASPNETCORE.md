# Enterprise Components for Angular Development Environment

## Creating an ASP.NET Core SPA Application

Install the .NET Core 2.1 SDK.

You can check what version of donet you have using the command `dotnet --version`.

```sh
dotnet new angular -o ids-enterprise-ng-aspnetcore
cd ids-enterprise-ng-aspnetcore
```

Run the app from either Visual Studio or the .NET Core CLI:

Ensure you have an environment variable called `ASPNETCORE_Environment` with a value of Development. On Windows (in non-PowerShell prompts), run `SET ASPNETCORE_Environment=Development`. On Linux or macOS, run export `ASPNETCORE_Environment=Development`.

Run `dotnet build` to verify the app builds correctly. On the first run, the build process restores npm dependencies, which can take several minutes. Subsequent builds are much faster.

Run `dotnet run` to start the app. A message similar to the following is logged:

```Now listening on: http://localhost:5000```

Navigate to this URL in a browser.

The app starts up an instance of the Angular CLI server in the background. A message similar to the following is logged: NG Live Development Server is listening on localhost:5000, open your browser on `http://localhost:5000/`. Ignore this message—it's not the URL for the combined ASP.NET Core and Angular CLI app.

## Upgrading to Angular / Angular CLI 6.1

The current SPA create and Angular 5 project, it is relatively easy to upgrade this to 6.1.

Open a terminal / command prompt inside the ClientApp folder.

```sh

npm i @angular/cli@latest
ng update @angular/cli
ng update @angular-devkit/build-angular
ng update codelyzer
npm install tsickle@latest --save-dev
ng update @angular/core

```

Ignore this error: (if it is still displayed - it will be fixed in @angular/compile-cli@6.1.1)

```sh

npm WARN tsickle@0.30.0 requires a peer of typescript@>=2.4.2 <2.9 but none is installed. You must install peer dependencies yourself.

```

## Adding the IDS Enterprise Controls

Following the instruction in the quickstart guide, from [Step 2](#Step2).  Note the root of the angular project is the *ClientApp* folder.

[#Step2]:QUICKSTART.md
