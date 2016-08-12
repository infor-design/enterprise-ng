# SoHo XI Directives for Angular 2.0

This repository serves as the shared location for Angular 2.0 directives which wrap the Soho XI component library.

This is a working group supported by the core H&L team,  bringing together the various efforts of teams each creating their own angular directives.

The goal is that this will make Angular easier to support for all teams and easier to extend as the library develops and to prevent multiple teams doing the same work. At the moment the project is being shaped during "Knights of the angular table" calls.

## Current Status

Agreed on project (using CLI and Typescript). Agreed on share Repo location and Jira http://jira/browse/HFC and will start to distribute from http://jira/browse/HFC-4016

## Agreed so far
* Will use Typescript
* Will wrap Soho XI controls
* Two Tracks: Track 1: Wrap Current Controls, Track 2: Es6 refactor of core controls keeping directives updated
* Focus on Expandable Area, Dropdown, Toolbar as initial example components
* Will be supported by the H&L team in collaboration with multiple teams
* We used https://cli.angular.io/
* Will use Angular Style guide: https://angular.io/styleguide
* Group discussion location https://sohoxi-dev.slack.com/messages/angular-components/
* With that use editor config, eslint and tslint
* Share location for issues / tasks is this Epic's sub tasks http://jira/browse/HFC-4016

## Open for Discussion
* How to divide work and proceed next

## Previous Repos

When we decided on project structure and approach. We collecting and compare repositories for the various teams and use what we all decide is the best. The following repos were up for evaluation:

* http://git.infor.com/users/twallace/repos/angular-components/browse - Tyler (CRM)
* http://git.infor.com/users/ppatton/repos/angular-components/browse - Landmark
* http://git.infor.com/projects/LMS/repos/angular-wrappers/browse - LMS
* http://git.infor.com/users/tharper/repos/sunsystems-reporting/browse - Sun Systems
* http://git.infor.com/projects/INFORCRM/repos/angular-crm/browse - Full CRM Repo

Many chose Angular Cli, so this was the resulting decision.


## Development Environment

### Install
- [Setup SSH key for using git](https://confluence.atlassian.com/bitbucket/set-up-ssh-for-git-728138079.html) (faster but not required)
- PC users suggest [ComEmu](https://conemu.github.io/) which works a bit better than CMD.
- Get the latest Node 5 release from https://nodejs.org/dist/latest-v5.x/.
- Get an Editor like Visual Studio Code (https://code.visualstudio.com/) or [Atom](https://atom.io/) or your fav.

### Initial Setup

- Fork http://git.infor.com/projects/SOHO/repos/angular-components/browse to your name + repo
- Clone Your Fork fx `git clone ssh://git@git.infor.com:7999/~tmcconechy/angular-components.git`
- Open a command prompt to angular-components
- Type `npm config set @infor:registry http://npm.infor.com:4873`
- Type `npm install -g angular-cli@latest`
- Type `npm i` (and wait a while …)
- Type `ng build`
- Type `ng serve`


## Other Resources

Check out these resources to get yourself familiar with some of the code and processes used here:

[Angular 2.0 Style Guide]( https://github.com/johnpapa/angular-styleguide/blob/master/a2/README.md) - Angular 2.0 style guide we follow.

[RxJS and Functional Reactive Programming](http://blog.jhades.org/angular-2-application-architecture-building-applications-using-rxjs-and-functional-reactive-programming-vs-redux/) - Example Implementation

[MockBackend for Angular 2](http://plnkr.co/edit/7LWALD?p=preview) - Plunkr on setting up a MockBackend

[RxJS and Observables](http://blog.jhades.org/functional-reactive-programming-for-angular-2-developers-rxjs-and-observables/) - General Overview

[Angular Member's RxJS App State](http://victorsavkin.com/post/137821436516/managing-state-in-angular-2-applications) - RxJS and Observable method

[Angular 2 In Production Today](http://blog.jhades.org/how-to-run-angular-2-in-production-today/) - Angular 2 Build Process

[Awesome Angular 2](https://www.npmjs.com/package/awesome-angular2) - Compiled list of Angular 2 resources

[Angular 2 Documentation](https://angular.io/docs/ts/latest/) - Angular 2 Library

[RxJS](http://reactivex.io/) - Library's Site

[Angular 2.0 Best Practices]( https://blog.budacode.com/2016/06/27/angular-2-best-practises/?utm_source=hackernews&utm_medium=social&utm_campaign=angular2-best-practises) - Angular 2.0 Best Practices

### Update Angular Cli To Webpack

`npm uninstall -g angular-cli`
`npm cache clean`
`npm install -g angular-cli@webpack`

[More Info On Changes Here](https://github.com/angular/angular-cli/blob/master/WEBPACK_UPDATE.md)
