# Release Publishing Notes

1. Verify the [change log](docs/changelog) is up-to-date
1. Run `npm run update-enterprise` to update the version if it needs it (see previous section), then commit.
1. Check if the angular dependencies need a minor update to latest. This is done by:
    - `npx ng update @angular/cli @angular/core`
    - Update peer dependencies in `projects/ids-enterprise-ng/package.json`
1. Edit `projects/ids-enterprise-ng/package.json` to set the wanted version.
1. Edit `projects/ids-enterprise-ng/src/lib/version/version-initializer.service.ts` to set the wanted version.
1. Run `npm run sync:lib`, then commit.
1. Create the release branch if needed (`#.#.x`) and `git pull --tags`
1. Run a release `npm run release:final`
1. Set the main branch to the next minor dev version, then commit.
1. Update the stackblitz and test the `quickstart`
1. Sometimes the latest tag in NPM gets set to the wrong thing (if patching an older release). If that happens run command: `npm dist-tags add ids-enterprise-ng@17.5.9 latest`
