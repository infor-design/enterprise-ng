# Dev Ops and Release Publishing Notes

1. Verify the [changelog](docs/changelog) is up-to-date
1. Run `npm run update-enterprise` to update the version if it needs it (see previous section), then commit.
1. Check if the angular dependencies need a minor update to latest. This is done by:
    - `npx ng update @angular/cli @angular/core`
    - Update peer dependencies in projects/ids-enterprise-ng/package.json
1. Edit `projects/ids-enterprise-ng/package.json` to set the wanted version.
1. Edit `projects/ids-enterprise-ng/src/lib/version/version-initializer.service.ts` to set the wanted version.
1. Run `npm run sync:lib`, then commit.
1. Create the release branch (`#.#.x`) and `git pull --tags`
1. Run a release `release:final``
1. Set the main branch to the next minor dev version, then commit.
1. Update the stackblitz and test the `quickstart`
1. Sometimes the latest tag in NPM gets set to the wrong thing (like an rc or beta). If that happens run commands like

    ```sh
    npm dist-tags add ids-enterprise-ng@17.5.9 latest
    npm dist-tags add ids-enterprise-ng@7.2.0-rc.2 rc
    ```
