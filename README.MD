# SoHo XI Directives for Angular 2.0

This repository will be the shared location for Angular 2.0 directives which wrap the Soho XI component library.
This is a working group supported by the core H&L team,  bringing together the various efforts of teams each creating their own angular directives.

The goal is that this will make Angular easier to support for all teams and easier to extend as the library develops and to prevent multiple teams doing the same work. At the moment the project is being shaped during "Knights of the angular table" calls.

## Getting Started
Check out these resources to get yourself familiar with some of the code and processes used here:

[RxJS and Functional Reactive Programming](http://blog.jhades.org/angular-2-application-architecture-building-applications-using-rxjs-and-functional-reactive-programming-vs-redux/) - Example Implementation

[MockBackend for Angular 2](http://plnkr.co/edit/7LWALD?p=preview) - Plunkr on setting up a MockBackend

[RxJS and Observables](http://blog.jhades.org/functional-reactive-programming-for-angular-2-developers-rxjs-and-observables/) - General Overview

[Angular Member's RxJS App State](http://victorsavkin.com/post/137821436516/managing-state-in-angular-2-applications) - RxJS and Observable method

[Angular 2 In Production Today](http://blog.jhades.org/how-to-run-angular-2-in-production-today/) - Angular 2 Build Process

[Awesome Angular 2](https://www.npmjs.com/package/awesome-angular2) - Compiled list of Angular 2 resources

[Angular 2 Documentation](https://angular.io/docs/ts/latest/) - Angular 2 Library

[RxJS](http://reactivex.io/) - Library's Site

## Decided so far
* Will use Typescript
* Will wrap Soho XI controls
* Two Tracks: Track 1: Wrap Current Controls, Track 2: Es6 refactor of core controls keeping directives updated
* Focus on Expandable Area, Dropdown, Toolbar as initial example components
* Will be supported by the H&L team in collaboration with multiple teams

## Up for Decision
* Use Angular Style guide: https://angular.io/styleguide
* With that use editor config, eslint and tslint
* Group discussion location https://sohoxi-dev.slack.com/messages/angular-components/
* https://cli.angular.io/
## Current Status

Deciding on project structure and approach. Collecting and compare repositories for the various teams and use what we all decide is the best. The following repos are up for evaluation:

* http://git.infor.com/users/twallace/repos/angular-components/browse - Tyler (CRM)
* http://git.infor.com/users/ppatton/repos/angular-components/browse - Landmark
* http://git.infor.com/projects/LMS/repos/angular-wrappers/browse - LMS
* http://git.infor.com/users/tharper/repos/sunsystems-reporting/browse - Sun Systems
* http://git.infor.com/projects/INFORCRM/repos/angular-crm/browse - Full CRM Repo

## Other Resources

* https://blog.budacode.com/2016/06/27/angular-2-best-practises/?utm_source=hackernews&utm_medium=social&utm_campaign=angular2-best-practises
