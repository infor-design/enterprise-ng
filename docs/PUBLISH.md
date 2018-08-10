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

## Dev Publish to NPM

These releases are dated (semver proper) and ONLY published to npm, not github.

1. Make sure you are on a clean `master` branch
1. Update the dev version
    ```sh
    npm run version-bump:dev
    ```
1. Update enterprise (optional)
    ```sh
    npm run update-enterprise
    ```
1. Publish to NPM
    ```sh
    npm publish publish/ --tag=dev
    ```
1. Undo the version changes/reset your branch (unless you specifically want to commit and push - rare)
    ```sh
    git reset --hard
    ```

*Note:* Typically you will NOT commit any of the above changes.

## Official, Tagged Releases

### Documentation

Verify the [changelog](docs/changelog) is up-to-date

### Make sure you have [credential] setup in .gitconfig  (Windows Users Only)

Details on [infor-design/enterprise/docs/PUBLISH.md](https://github.com/infor-design/enterprise/blob/master/docs/PUBLISH.md#make-sure-you-have-credential-setup-in-gitconfig--windows-users-only)

### Make sure you have a GITHUB_ACCESS_TOKEN configured

Details on [infor-design/enterprise/docs/PUBLISH.md](https://github.com/infor-design/enterprise/blob/master/docs/PUBLISH.md#make-sure-you-have-a-github_access_token-configured)

### Update the version of ids-enterprise

This will update the versions used in both package.json files. And also will update the icons that
are copied into src/soho/icon.

1. Update enterprise
    ```sh
    npm run update-enterprise
    ```
1. Create a PR to be merged

### Release

1. Make sure you have release-it installed (`npm install release-it -g`)
1. Checkout the release branch (`A.B.x`) and `git pull --tags`
    - Set the master branch to the next minor dev version. For example if we made branch `4.9.x`, then the `master` publish/package.json version should now be changed to `4.10.0-dev`
    - "Protect" the release branch with github settings
1. Run a release cmd:
    - `npm run release:beta` - beta
    - `npm run release:rc` - release candidate normally the final testing branch before the release
    - `release:final` - the release itself
    - **Always** verify the release version when the script asks

For a final release, finish with:

1. Merge the release branch (`X.Y.Z`) back into `master` but keep branch (`X.Y.Z`)
