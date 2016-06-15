# Project Setup
1. make sure the latest node is installed (https://nodejs.org/en/download/current/)
2. run config list: there should be
```
; userconfig C:\Users\ppatton\.npmrc<br>
@infor:registry = "http://npm.infor.com:4873/"
registry = "https://registry.npmjs.org/"
```
3. If not then run ```npm set registry http://npm.infor.com:4873 --scope=@infor``` to add it to your .npmrc list
4. In the angular-component directory run ```npm install```

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
