
# SoHo XI Directives for Angular 2.0

This repository serves as the central shared location for a crowd-sourced cross-Infor Angular2 Typescript repo of Xi control wrapped components.

  - avoids many teams building the same things - inefficient and asking Xi Team for different flavors of the same thing
  - divide the work to get more done
  - net new teams get huge gains
  - great way to learn new things about angular and typescript, and code/architecture conventions
  - includes wrappers and demos (usage) to get new teams and developers up to speed faster
  - built-in feedback look from dev to H&L and back

This is a working group supported by the core H&L team,  bringing together the various efforts of teams each creating their own angular directives.

The goal is that this will make Angular easier to support for all teams and easier to extend as the library develops and to prevent multiple teams doing the same work. At the moment the project is being shaped during "Knights of the angular table" calls. Contact andrew.lipetzky@infor.com if interested in joining the call its open to anyone how wants to contribute.

The team is using https://slack.com/ for a communication forum.  We have created a [SoHo XI area | http://sohoxi-dev.slack.com/] for discussions related to the components.  There are https://sohoxi-dev.slack.com/messages/general/ and https://sohoxi-dev.slack.com/messages/angular-components/ channels for those discussion topics.  It is becoming more active every day.

## Current Status

Agreed on project scaffolding (using CLI and Typescript). Agreed on [shared Repo location |http://jira/browse/SOHO-4016] this master epic has all subtasks related to on going work
http://jira/browse/SOHO-4016. You can also use it to see whats been done.

## Agreed so far
* Will use Typescript
* Will wrap Soho XI controls
* Two Tracks: Track 1: Wrap Current Controls, Track 2: Es6 refactor of core controls keeping directives updated
* Will be supported by the H&L team in collaboration with multiple teams
* We used https://cli.angular.io/
* Will use Angular Style guide: https://angular.io/styleguide
* Group discussion location https://sohoxi-dev.slack.com/messages/angular-components/
* Use editor config, eslint and tslint
* Share location for issues / tasks is this Epic's sub tasks http://jira/browse/SOHO-4016

## Active Teams

* CRM (US - Arizona)
* Landmark (US - St. Paul)
* Sun Systems (UK)
* H&L (US NYC + PA)
* M3 Graphical Lot Tracker (Sweden, US - Penn)
* M3 Sales Hub, Automotive Exchange (US – East)
* Plus a couple of others.  Hard to keep track, Add your name with a Pull Request :)

Other teams staying informed or involved in the past: LMS, Ming.le Home Pages (SE), Mongoose, GT Nexus, ION

#### Feature status:

| Feature          | Status                              | Docs         | Issue          |
|------------------|-------------------------------------|--------------|----------------|
| application-menu |                           Available | [README][1]  |              - |
| button           |                           Available | [README][1]  |              - |
| cards            |                           Available | [README][2]  |              - |
| checkbox         |                           Available | [README][3]  |              - |
| radio            |                           Available | [README][4]  |              - |
| input            |                           Available | [README][5]  |              - |
| sidenav          |                           Available | [README][6]  |              - |
| toolbar          |                           Available | [README][7]  |              - |
| list             |                           Available | [README][8]  |   [#107][0107] |
| grid-list        |                           Available | [README][9]  |              - |
| icon             |                           Available | [README][10] |              - |
| progress-spinner |                           Available | [README][11] |              - |
| progress-bar     |                           Available | [README][12] |              - |
| tabs             |                           Available | [README][13] |              - |
| slide-toggle     |                           Available | [README][14] |              - |
| button-toggle    |                           Available | [README][15] |              - |
| slider           |                           Available | [README][16] |              - |
| menu             |                           Available | [README][17] |   [#119][0119] |
| tooltip          |                           Available | [README][18] |              - |
| ripples          |                           Available | [README][19] |   [#108][0108] |
| dialog           |                           Available | [README][22] |   [#114][0114] |
| snackbar / toast |                           Available | [README][21] |   [#115][0115] |
| select           |                           Available |           -  |   [#118][0118] |
| textarea         |                           Available |           -  |              - |
| autocomplete     |                         In-progress |           -  |   [#117][0117] |
| chips            |  Initial version, features evolving |           -  |   [#120][0120] |
| theming          |   Available, need guidance overlays | [Guide][20]  |              - |
| docs site        |   UX design and tooling in progress |           -  |              - |
| typography       |                         Not started |           -  |   [#205][0205] |
| fab speed-dial   |                         Not started |           -  |   [#860][0860] |
| fab toolbar      |                         Not started |           -  |              - |
| bottom-sheet     |                         Not started |           -  |              - |
| bottom-nav       |                         Not started |           -  |   [#408][0408] |
| virtual-repeat   |                         Not started |           -  |   [#823][0823] |
| datepicker       |                         Not started |           -  |   [#675][0675] |
| data-table       |                  Design in-progress |           -  |   [#581][0581] |
| stepper          |                         Not started |           -  |   [#508][0508] |
| layout           |   See [angular/flex-layout][lay_rp] | [Wiki][0]    |              - |

## Previous Repos

When we decided on project structure and approach. We collecting and compare repositories for the various teams and use what we all decide is the best. The following repos were considered and discussed.

* http://git.infor.com/users/twallace/repos/angular-components/browse - Tyler (CRM)
* http://git.infor.com/users/ppatton/repos/angular-components/browse - Landmark
* http://git.infor.com/projects/LMS/repos/angular-wrappers/browse - LMS
* http://git.infor.com/users/tharper/repos/sunsystems-reporting/browse - Sun Systems
* http://git.infor.com/projects/INFORCRM/repos/angular-crm/browse - Full CRM Repo
*
Many chose Angular Cli, so this was the resulting decision.

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
