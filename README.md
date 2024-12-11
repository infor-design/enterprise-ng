# Infor Design System's Enterprise Components for Angular

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![npm version](https://badge.fury.io/js/ids-enterprise-ng.svg)](https://badge.fury.io/js/ids-enterprise-ng)

This repository serves as the central shared location for cross-Infor Angular Typescript UI components. These components do a few things:

- avoids many teams building the same things
- avoids asking for different flavors of the same thing
- net new teams get gains
- includes wrappers and demos (usage) to get new teams and developers up to speed faster
- built-in look from dev to design and back

If you're an Infor employee, you can join our [MS Teams Group](https://teams.microsoft.com/l/team/19%3A2b0c9ce520b0481a9ce115f0ca4a326f%40thread.skype/conversations?groupId=4f50ef7d-e88d-4ccb-98ca-65f26e57fe35&tenantId=457d5685-0467-4d05-b23b-8f817adda47c) for updates and questions.

## Browser Support

We support the latest release and the release previous to the latest (R-1) for browsers and OS versions:

<!-- markdownlint-disable MD013 MD033 -->
| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari |
| --------- | --------- | --------- | --------- | --------- |
| R-1 | R-1 | R-1| R-1| R-1 |
<!-- markdownlint-enable MD013 MD033 -->

## Installation

The components are available via npm/yarn and we recommend you use them as peer dependencies.

```sh
npm install  --save-peer ids-enterprise-ng@latest
```

To Clone and Run this Repo locally (requires node 20)

```sh
mkdir enterprise-ng
cd enterprise-ng
git clone ssh://git@oxfordssh.awsdev.infor.com:7999/infor-design/enterprise-ng.git .
nvm use
npm i
npm run build:lib
npm run start
```

Also include the [Source Sans Pro Font](https://github.com/infor-design/ids-foundation/blob/main/fonts/README.md) in your project and app pages.

## Installation Of Types

Option 1. Install the types globally by adding this to the top of your project’s `app.component.ts`

```sh
/// <reference types="ids-enterprise-typings" />
```

Option 2. Install the types using typeRoots and then adding the types to your `tsconfig.json` for an example [see the quick start project](https://oxford.awsdev.infor.com/infor-design/enterprise-ng-quickstart/-/blob/main/tsconfig.json?ref_type=heads#L16-21)
