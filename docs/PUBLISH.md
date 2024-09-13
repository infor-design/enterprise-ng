# Dev Ops and Release Publishing Notes

1. Verify the [changelog](docs/changelog) is up-to-date
1. Make sure you ran `npm run update-enterprise` to update the version if it needs it (see previous section).
1. Check if the angular dependencies need a minor update to latest. This is done by:
    - `ng update @angular/cli @angular/core`
    - Update peer dependencies in projects/ids-enterprise-ng/package.json
1. Edit `projects/ids-enterprise-ng/src/lib/version/version-initializer.service.ts` to set the new next version.
1. Commit the update (see previous section).
1. Create the release branch (`#.#.x`) and `git pull --tags`
1. Run a release cmd:
    - `npm run release:final` - the release itself
1. Set the main branch to the next minor dev version.
    - For example if we made branch `4.9.x`, then the `main` projects/ids-enterprise-ng/package.json version should now be changed to `4.10.0-dev`
1. Commit the version change and push to main
1. Bump the changelog
1. Update the stackblitz and quickstart
1. Sometimes the latest tag in NPM gets set to the wrong thing (like an rc or beta). If that happens run commands like

    ```sh
    npm dist-tags add ids-enterprise-ng@17.5.9 latest
    npm dist-tags add ids-enterprise-ng@7.2.0-rc.2 rc
    ```
