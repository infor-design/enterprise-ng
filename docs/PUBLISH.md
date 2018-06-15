# Dev Ops and Release Publishing Tasks and Notes

## Prerequisites

- collaborator permissions with our npmjs.com organization
- correct permissions on github
- setup the github token, require in release-it script

## Check Published npm Tags

```bash
npm info ids-enterprise-ng dist-tags
npm view ids-enterprise-ng versions
```

## Steps for Cutting a Release

## Documentation

- Verify the [changelog](docs/changelog) is up-to-date

## Update the version of ids-enterprise

- <https://github.com/infor-design/enterprise>
- `npm i ids-enterprise@latest --save`
- Get PR merged in and pushed

## Steps using release-it

- `npm install release-it -g`- Export your existing token or [Generate a token](https://github.com/webpro/release-it#%EF%B8%8F-github-release) (save this tokens somewhere for future releases - do not commit it)
    - `export GITHUB_ACCESS_TOKEN="{YOUR TOKEN}"` to set the token (its `export` for OSX)
- Checkout the release branch and `git pull --tags`
- Type of releases:
    - `npm run release:dev` - dev (Note: Will NOT git tag or github release)
    - `npm run release:beta` - beta
    - `npm run release:rc` - release candidate normally the final testing branch before the release
    - `release:final` - the release itself
    - **Always** verify the release version when the script asks
- Merge back into `master`
- PR the master version to the proper "dev" version
    - i.e. if we just released `4.7.0`, master will now be `4.8.0-dev`

## Test Npm packages

```bash
npm view ids-enterprise-ng versions
npm view ids-enterprise-angular versions

npm info ids-enterprise-angular dist-tags
npm info ids-enterprise-ng dist-tags
```
