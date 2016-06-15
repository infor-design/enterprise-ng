# Project Setup
1. make sure node is installed (http://nodejs.org)
2. In the angular-component directory run ```npm install```
3. ```npm set registry http://npm.infor.com:4873 --scope=@infor```
4. ```npm install @infor/sohoxi```. Don't use --save since this package is in a private registry
5. Set the registry back to ```npm set registry https://registry.npmjs.org/```

# Intellij 2016 Users:
1. File -> Settings... -> Language and Frameworks -> Typescript
2. Check `Resolve Object using tsconfig.json`
3. Check `Enable typescript compiler`
4. Select `Use tsconfig.json`
5. Click `OK` to close settings

![alt tag](./docs/images/intellij-typescript-settings.png)

# Start Server and Run
1. node app
2. http://localhost:3000
