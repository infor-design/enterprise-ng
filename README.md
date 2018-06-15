# :tada: Infor Design System's Enterprise Components for Angular Has Moved to Github

(formerly "SoHo XI Directives")

Starting at the end of release `4.6.0`, we moved the Soho XI codebase to Github and the Angular repo is following! What this means is now anyone can view and contribute to the codebase.

You can go to <https://github.com/infor-design/enterprise-ng> and download/clone/fork the repo.

**Note:** More information on contributing can be found in the @infor-design/enterprise repo [here](https://github.com/infor-design/enterprise/blob/master/docs/CONTRIBUTING.md).

## Infor Design System's Enterprise Components for Angular

This repository serves as the central shared location for a crowd-sourced cross-Infor Angular Typescript repo of Xi control wrapped components.

- avoids many teams building the same things - inefficient and asking Xi Team for different flavors of the same thing
- divide the work to get more done
- net new teams get huge gains
- great way to learn new things about angular and typescript, and code/architecture conventions
- includes wrappers and demos (usage) to get new teams and developers up to speed faster
- built-in feedback look from dev to H&L and back

This is a working group supported by the core H&L team,  bringing together the various efforts of teams each creating their own angular directives.

The goal is that this will make Angular easier to support for all teams and easier to extend as the library develops and to prevent multiple teams doing the same work. At the moment the project is being shaped during "Knights of the angular table" calls. Contact andrew.lipetzky@infor.com if interested in joining the call its open to anyone how wants to contribute.

The team is using [slack](https://slack.com/) for a communication forum.  We have created a [SoHo XI area](http://sohoxi-dev.slack.com/) for discussions related to the components.

There are <https://sohoxi-dev.slack.com/messages/general/> and <https://sohoxi-dev.slack.com/messages/angular-components/> channels for those discussion topics.  It is becoming more active every day.

## Current Status

Agreed on project scaffolding (using CLI and Typescript). Agreed on [shared Repo location](http://jira/browse/SOHO-4016) this master epic has all subtasks related to on going work
<http://jira/browse/SOHO-4016>. You can also use it to see whats been done.

## Agreed so far

- Will use Typescript 2.7.x
- Will wrap Soho XI controls
- Two Tracks: Track 1: Wrap Current Controls, Track 2: Es6 refactor of core controls keeping directives updated
- Will be supported by the H&L team in collaboration with multiple teams
- Will use <https://cli.angular.io/>
- Will use Angular Style guide: <https://angular.io/styleguide>
- Group discussion location <https://sohoxi-dev.slack.com/messages/angular-components/>
- Use editor config, eslint and tslint
- Share location for issues / tasks is this Epic's sub tasks <http://jira/browse/SOHO-4016>

## Active Teams

- CRM (US - Arizona)
- Landmark (US - St. Paul)
- Sun Systems (UK)
- H&L (US NYC + PA)
- M3 Graphical Lot Tracker (Sweden, US - Penn)
- M3 Sales Hub, Automotive Exchange (US – East)
- Plus a couple of others.  Hard to keep track, Add your name with a Pull Request :)

Other teams staying informed or involved in the past: LMS, Ming.le Home Pages (SE), Mongoose, GT Nexus, ION

### Feature status

| Feature                 | Status                              | Docs         | Issue              |
|-------------------------|-------------------------------------|--------------|--------------------|
| accordion               |                           Available |  [README][3] | [SOHO-4344][#4344] |
| application-menu        |                           Available |            - | [SOHO-3950][#3950] |
| autocomplete            |                           Available |            - | [SOHO-6759][#6759] |
| busyindicator           |                           Available |            - | [SOHO-4096][#4096] |
| button                  |                           Available |            - | [SOHO-4556][#4556] |
| checkbox                |                           Available |            - | [SOHO-4617][#4617] |
| colorpicker             |                           Available |            - | [SOHO-6503][#6503] |
| context-menu            |                           Available |            - | [SOHO-4557][#4557] |
| contextual-action-panel |                           Available |  [README][0] | [SOHO-5909][#5909] |
| datagrid                |                           Available |  [README][4] | [SOHO-4049][#4049] |
| datepicker              |                           Available |            - | [SOHO-4489][#4489] |
| dropdown                |                           Available |            - | [SOHO-4050][#4050] |
| editor                  |                           Available |            - | [SOHO-4559][#4559] |
| error                   |                           Available |            - |                  - |
| expandablearea          |                           Available |            - | [SOHO-4017][#4017] |
| fieldOptions            |                           Available |            - | [SOHO-6265][#6265] |
| fileupload              |                           Available |            - | [SOHO-4560][#4560] |
| fileupload-advanced     |                           Available |            - | [SOHO-5124][#5214] |
| fieldset                |                             Pending |            - | [SOHO-4561][#4561] |
| header                  |                           Available |            - |                  - |
| homepage                |                           Available |            - |                  - |
| hyperlink               |                           Available |            - | [SOHO-4562][#4562] |
| icon                    |                           Available |            - |              - |
| input                   |                           Available |            - |              - |
| input-validate          |                           Available |            - |              - |
| label                   |                           Available |            - | [SOHO-4570][#4570] |
| lightbox                |                     Not Implemented |            - | [SOHO-5127][#5127] |
| listview                |                           Available | [README][2]  | [SOHO-4040][#4040] |
| locale                  |                           Available |            - | [SOHO-4470][#4470] |
| lookup                  |                           Available |            - | [SOHO-4052][#4052] |
| mask                    |                           Available |            - | [SOHO-3895][#3895] |
| masthead                |                           Available |            - |              - |
| menu-button             |                           Available |            - | [SOHO-4049][#4089] |
| message                 |                           Available |            -  |              - |
| modal-dalog             |                           Available | [README][1]  | [SOHO-4734][#4734]|
| pager                   |                           Available |           -  |              - |
| personalize             |                           Available |           -  |              - |
| popdown                 |                           Available |           -  | [SOHO-4653][#4563] |
| popupmenu               |                           Available |           -  | [SOHO-4342][#4342] |
| progress                |                           Available |           -  | [SOHO-4342][#4342] |
| rating                  |                             Pending |           -  | [SOHO-5126][#5126] |
| radiobutton             |                           Available |           -  | [SOHO-4562][#4562] |
| searchfield             |                           Available |           -  | [SOHO-4422][#4422] |
| slider                  |                           Available |           -  | [SOHO-4565][#4565] |
| spinbox                 |                           Available |           -  | [SOHO-5125][#5125] |
| splitter                |                           Available |           -  | [SOHO-4402][#4402] |
| stepprocess             |                           Available |           -  | [SOHO-4999][#4999] |
| swaplist                |                           Available |           -  | [SOHO-5122][#5122] |
| tag                     |                           Available | [README][5]  | [SOHO-8005][#8005] |
| tabs                    |                           Available |           -  |              - |
| textarea                |                           Available |           -  |              - |
| timepicker              |                           Available |           -  |              - |
| theming                 |                     Partial Support |           -  |              - |
| toast                   |                           Available |           -  |              - |
| toolbar                 |                           Available |           -  |              - |
| tooltip                 |                           Available |           -  |              - |
| trackdirty              |                           Available |           -  |              - |
| tree                    |                           Available |           -  | [SOHO-4043][#4083] |
| treegrid                |                           Available |           -  | [SOHO-4722][#4722] |
| wizard                  |                         In-progress |           -  | [SOHO-6317][#6317] |

[0]: http://git.infor.com/projects/SOHO/repos/angular-components/browse/src/soho/contextual-action-panel/README.md
[1]: http://git.infor.com/projects/SOHO/repos/angular-components/browse/src/soho/modal-dialog/README.md
[2]: http://git.infor.com/projects/SOHO/repos/angular-components/browse/src/soho/listview/README.md
[3]: http://git.infor.com/projects/SOHO/repos/angular-components/browse/src/soho/accordion/README.md
[4]: http://git.infor.com/projects/SOHO/repos/angular-components/browse/src/soho/datagrid/README.md
[5]: http://git.infor.com/projects/SOHO/repos/angular-components/browse/src/soho/tag/README.md
[#6759]: http://jira/browse/SOHO-6759
[#4344]: http://jira/browse/SOHO-4344
[#5909]: http://jira/browse/SOHO-5909
[#3895]: http://jira/browse/SOHO-3895
[#3950]: http://jira/browse/SOHO-3950
[#4017]: http://jira/browse/SOHO-4017
[#4040]: http://jira/browse/SOHO-4040
[#4049]: http://jira/browse/SOHO-4049
[#4050]: http://jira/browse/SOHO-4050
[#4052]: http://jira/browse/SOHO-4052
[#4083]: http://jira/browse/SOHO-4083
[#4089]: http://jira/browse/SOHO-4089
[#4096]: http://jira/browse/SOHO-4096
[#4097]: http://jira/browse/SOHO-4097
[#4342]: http://jira/browse/SOHO-4342
[#4402]: http://jira/browse/SOHO-4402
[#4422]: http://jira/browse/SOHO-4422
[#4470]: http://jira/browse/SOHO-4470
[#4489]: http://jira/browse/SOHO-4489
[#4556]: http://jira/browse/SOHO-4556
[#4557]: http://jira/browse/SOHO-4557
[#4559]: http://jira/browse/SOHO-4559
[#4560]: http://jira/browse/SOHO-4560
[#4561]: http://jira/browse/SOHO-4561
[#4562]: http://jira/browse/SOHO-4562
[#4563]: http://jira/browse/SOHO-4563
[#4564]: http://jira/browse/SOHO-4564
[#4565]: http://jira/browse/SOHO-4565
[#4570]: http://jira/browse/SOHO-4570
[#4616]: http://jira/browse/SOHO-4616
[#4617]: http://jira/browse/SOHO-4617
[#4722]: http://jira/browse/SOHO-4722
[#4734]: http://jira/browse/SOHO-4734
[#4999]: http://jira/browse/SOHO-4999
[#5122]: http://jira/browse/SOHO-5122
[#5124]: http://jira/browse/SOHO-5124
[#5125]: http://jira/browse/SOHO-5125
[#5126]: http://jira/browse/SOHO-5126
[#5127]: http://jira/browse/SOHO-5127
[#5214]: http://jira/browse/SOHO-5214
[#6317]: http://jira/browse/SOHO-6317
[#6265]: http://jira/browse/SOHO-6265
[#6503]: http://jira/browse/SOHO-6503
[#8005]: http://jira/browse/SOHO-8005

## Previous Repos

When we decided on project structure and approach. We collecting and compare repositories for the various teams and use what we all decide is the best. The following repos were considered and discussed.

- <http://git.infor.com/users/twallace/repos/angular-components/browse> - Tyler (CRM)
- <http://git.infor.com/users/ppatton/repos/angular-components/browse> - Landmark
- <http://git.infor.com/projects/LMS/repos/angular-wrappers/browse> - LMS
- <http://git.infor.com/users/tharper/repos/sunsystems-reporting/browse> - Sun Systems
- <http://git.infor.com/projects/INFORCRM/repos/angular-crm/browse> - Full CRM Repo

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
