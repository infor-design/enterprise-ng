# NPM Publish: Manual Dev Build

These are steps to publish to npmjs.com manually, using the `publish-dev` npm script.

## Prerequisites:

- collaborator permissions with our npmjs.com organization

## To Publish

1. Update master
    > git pull origin master

2. Update to the latest `ids-enterprise` nightly package
    -  `npm i ids-enterprise@dev --save` to update the root "./package.json"

3. Change the enterprise-ng "version" in `package.json` to be in the format you want and save.
    - “dev” builds append the date: `X.Y.Z-dev.YYYYMMDD`, `"version": "3.7.0-dev.20180523"`
  
**!! It is recommend to avoid committing and pushing these files if it is a true “nightly” !!**

3. Run the correct publish script/command (see `./package.json` for more scripts)
    >  `npm run publish-dev`

4. Go to npmjs.org and verify the package was published. This may take up to 10 minutes to see. You can also verify in your terminal by doing:
    npm info {package name}
    (i.e. npm info ids-enterprise)
