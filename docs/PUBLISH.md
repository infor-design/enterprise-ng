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
1. Run the npm cmd to do a dev release:

    ```sh
    npm run release:dev
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
are copied into src/app/icon.

1. Update enterprise

    ```sh
    npm run update-enterprise
    ```

1. Create a PR to be merged or, if releasing, go ahead and commit/push to the version branch.

### Release

1. Make sure you ran `npm run update-enterprise` to update the version if it needs it (see previous section).
1. Check if the angular dependencies need a minor update to latest. This is done by:
    - `ng update @angular/cli @angular/core`
    - Update peer dependencies in projects/ids-enterprise-ng/package.json
1. Commit the update (see previous section).
1. Checkout the release branch (`#.#.x`) and `git pull --tags`
    - If you have just created the release branch, verify it is "Protected" in github settings
1. Run a release cmd:
    - `npm run release:beta` - beta
    - `npm run release:rc` - release candidate normally the final testing branch before the release
    - `npm run release:final` - the release itself
    - **Always** verify the release version when the script asks
1. Set the master branch to the next minor dev version.
    - For example if we made branch `4.9.x`, then the `master` projects/ids-enterprise-ng/package.json version should now be changed to `4.10.0-dev`
1. Run `npm run sync:lib` after setting the master branch version
1. Commit the version change and push to master
1. Bump the changelog

For a final release, finish with:

1. Merge the release branch `#.#.x` back into `master` (but keep branch `#.#.x`)

    ```sh
    git checkout master
    git pull origin master
    git merge <release branch>
    ```

1. Fix any conflicts (don't commit yet)
1. Use the version sync script after verifying or correcting the `master` branch version (don't commit yet)

    ```sh
    npm run sync:lib
    ```

1. Commit the version change (and any merge conflict fixes) and push to `master`

    ```sh
    git push origin master
    ```

1. Update the ids-enterprise-quickstart with the new versions
    - Update the `ids-enterprise-ng` version to a final version
    - Keep NG updated with `ng update @angular/cli @angular/core`
