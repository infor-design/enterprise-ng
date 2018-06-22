# Infor Design System's Enterprise Components for Angular

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![npm version](https://badge.fury.io/js/ids-enterprise-ng.svg)](https://badge.fury.io/js/ids-enterprise-ng)
[![Build Status](https://travis-ci.com/infor-design/enterprise-ng.svg?branch=master)](https://travis-ci.com/infor-design/enterprise-ng)

This repository serves as the central shared location for a crowd-sourced cross-Infor Angular Typescript repo of Xi control wrapped components.

- avoids many teams building the same things - inefficient and asking Xi Team for different flavors of the same thing
- divide the work to get more done
- net new teams get huge gains
- great way to learn new things about angular and typescript, and code/architecture conventions
- includes wrappers and demos (usage) to get new teams and developers up to speed faster
- built-in feedback look from dev to H&L and back

This is a working group supported by the core H&L team,  bringing together the various efforts of teams each creating their own angular directives.

If you're an Infor employee, you can join our MS Teams Group for updates.

The goal is that this will make Angular easier to support for all teams and easier to extend as the library develops and to prevent multiple teams doing the same work. At the moment the project is being shaped during "Knights of the angular table" calls.

## Enterprise components

See the [list of features](docs/FEATURES.md) for details about the included and planned component covereage.

## Strategy

- Will use Typescript 2.7.x
- Will wrap Soho XI controls
- Two Tracks: Track 1: Wrap Current Controls, Track 2: Es6 refactor of core controls keeping directives updated
- Will be supported by the H&L team in collaboration with multiple teams
- Will use <https://cli.angular.io/>
- Will use Angular Style guide: <https://angular.io/styleguide>
- Group discussion location <https://sohoxi-dev.slack.com/messages/angular-components/>
- Use editor config, eslint and tslint
- Share location for issues / tasks is this Epic's sub tasks <http://jira/browse/SOHO-4016>

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
