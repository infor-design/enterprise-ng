# Project Setup
1. Make sure the latest node is installed (https://nodejs.org/en/download/current/)
2. Run config list: there should be
```
; userconfig C:\Users\user\.npmrc<br>
@infor:registry = "http://npm.infor.com:4873/"
registry = "https://registry.npmjs.org/"
```
3. If not then run ```npm set registry http://npm.infor.com:4873 --scope=@infor``` to add it to your .npmrc list
4. In the angular-component directory run ```npm install```

# Development Setup
## Intellij 2016 Users:
1. File -> Settings... -> Language and Frameworks -> Typescript
2. Check `Resolve Object using tsconfig.json`
3. Check `Enable typescript compiler`
4. Select `Use tsconfig.json`
5. Click `OK` to close settings

![alt tag](./docs/images/intellij-typescript-settings.png)

## Visual Studio Code Users:
1. Install ESLint plugin. (ext install ____)
2. Install TSLint plugin.
3. Install EditorConfig plugin.
4. Recommended: Install Angular 2 Typescript Snippets by John Papa.
5. Recommended: Install language-vscode-javascript-angular2 plugin by nwallace for HTML highlighting in a Component's 'template'.

# Start Server and Run
1. Run `npm start` from the command line in the `angular-components` directory.
2. Go to: http://localhost:3000 to see the project. The project is watched by the Broccoli compiler and will automatically update on changes to it.
