
# SoHo XI Directives for Angular 2.0

This repository serves as the central shared location for a crowd-sourced cross-Infor Angular2 Typescript repo of Xi control wrapped components.

  - avoids many teams building the same things - inefficient and asking Xi Team for different flavors of the same thing
  - divide the work to get more done
  - net new teams get huge gains
  - great way to learn new things about angular and typescript, and code/architecture conventions
  - includes wrappers and demos (usage) to get new teams and developers up to speed faster
  - built-in feedback look from dev to H&L and back

This is a working group supported by the core H&L team,  bringing together the various efforts of teams each creating their own angular directives.

The goal is that this will make Angular easier to support for all teams and easier to extend as the library develops and to prevent multiple teams doing the same work. At the moment the project is being shaped during "Knights of the angular table" calls. Contact andrew.lipetzky@infor.com if interested in joing the call its open to anyone how wants to contribute.

The team is using https://slack.com/ for a communication forum.  We have created a [SoHo XI area | http://sohoxi-dev.slack.com/] for discussions related to the components.  There are https://sohoxi-dev.slack.com/messages/general/ and https://sohoxi-dev.slack.com/messages/angular-components/ channels for those discussion topics.  It is becoming more active every day.

## Current Status

Agreed on project scaffolding of (using CLI and Typescript). Agreed on [shared Repo location |http://jira/browse/SOHO-4016] this master epic has all subtasks related to on going work
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
* Plus a couple of others.  Hard to keep track, Add you name with a Pull Request :)

Other teams staying informed or involved in the past: LMS, Ming.le Home Pages (SE), Mongoose, GT Nexus, ION

## Previous Repos

When we decided on project structure and approach. We collecting and compare repositories for the various teams and use what we all decide is the best. The following repos were considered and discussed.

* http://git.infor.com/users/twallace/repos/angular-components/browse - Tyler (CRM)
* http://git.infor.com/users/ppatton/repos/angular-components/browse - Landmark
* http://git.infor.com/projects/LMS/repos/angular-wrappers/browse - LMS
* http://git.infor.com/users/tharper/repos/sunsystems-reporting/browse - Sun Systems
* http://git.infor.com/projects/INFORCRM/repos/angular-crm/browse - Full CRM Repo
*
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

## Components and Typings

A brief overview of a simple component in the Soho Angular Component project.  The intention is to define the contract between the Soho jQuery controls and the Soho Angular Components.

### Structure
    soho\
      mywidget\
        soho-widget.d.ts
        soho-widget.component.ts
        soho-widget.component.html
    README.md (optional)

The typing file contains all the public API for the underlying Soho jQuery controls, it also contains some internal information required to get the component working.

    /**
     * Soho widet Control Typings.
     *
     * This file contains the Typescript mappings for the public
     * interface of the Soho jQuery widget control.
     */

    /** Configuration options. */
    interface SohoWidgetOptions {
      /** The number of widget to add. */
      count?: number;
    }

    /** Soho control widget api.*/
    interface SohoWidgetStatic {
      /** Destructor. */
      destroy(): void;
    }

    interface SohoWidgetBuiltEvent {
      event: JQueryObjectEvent;
      widgetId: string;
    }

    interface JQueryStatic {
      widget: SohoWidgetStatic;
    }

    interface JQuery {
      widget(options?: SohoWidgetOptions): JQuery;
    }

The types defined in here attempt to represent the interface exposed by the wrapped control, including:

 - Simple types (number, string, ...)
 - Union types (enums)
 - Functions Prototypes (for source and response functions)
 - Events (for triggered events)  

It is **important** that the typings files accurately represent the underlying jQuery control, so any changes made by the Soho team need to made to the corresponding Soho Angular Component  typing file.

### The Component

The structure of a very simple Soho Angular Component that wraps a ficticious  jQuery Control called widget is defined below:

    below:
    @Component({
      selector: 'soho-widget',
      template: 'soho-widget.component.html',
      changeDetection: ChangeDetectionStrategy.OnPush
    })
    export class SohoWidgetComponent extends AfterViewInit, OnDestroy {

**INPUTS**
The inputs define the properties exposed by the component for integration with other Angular Components.  In this case we have the general  *options* input and one for each discreet option, in this case *count*.

      /** Configuration options. */
      @Input() options: SohoWidgetOptions = {};

      @Input() set count(value: number) {
        this.options.count = value;
    if (this.widget) {
      this.widget.settings.count = value;
      this.widget.updated();
    }
      }

**OUTPUTS**
The outputs are the events emitted by the component.

    @Output() built = new EventEmitter<SohoWidgetBuiltEvent>();

**HOST BINDINGS**

Then any host bindings required to annoate the markup, such as classes, or attributes.  Some of these may of course we controlled by other properties.

      @HostBinding('class.soho-widget') get isWidget() { return true; }
    Then private member data:
      private element: JQuery;
      private widget: SohoWidgetStatic;

**METHODS**

Expose the methods provided by the component wrapper.

      makeWidget(): void {
        Assert.NotNull(this.widget);
        this.widget.makeWidget();
      }

**LIFE CYCLE**

The constructor needs to store the injected element reference.

      constructor(private element: ElementRef) {}

 Then we handle the AfterViewEvent.

    ngAfterViewInit() {
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.widget(this.options);
      this.widet = this.jQueryElement.data('widget');
      this.jQueryElement
    .on('built', (e: JQueryObjecyEvent, widgetId: string) => this.built.next({widgetId}));
    }

Finally, the destructor.

    ngOnDestroy() {
      if (this.widget) {
    this.widget.destroy();
    this.widget = null;
      }
    }

**HTML**
The HTML file should include any markup required for the control to work.

    <soho-icon *ngIf="count > 1" [icon]='gear'></soho-icon>
    <ng-content></ng-content>

###Pulling it all together
The component is then added into the consolidated typings using the top level typing files:

    soho\
     soho-components.d.ts
     soho.d.ts

This file includes a reference to each of the typings files defined within each component, e.g.

    /// <reference path="./widget/soho-widget.d.ts" />

To integrate this into your application simply include a reference to soho\soho-**components.d.ts** file in your **typings.d.ts** file.
There is also a **soho.d.ts** file, this pulls in the **soho-components.d.ts** file and also adds some additional global structures.  However,  this may be deleted when all the existing components have had individual typings created.  

###Issues
####Interface leaking
Exposing the typings in the way we do means the hosting application has access to JQuery control (and it api) which can cause issues with the Angular Component.  As a rule, I would expect all applications to use the Soho Angular Component, and extend the component when it does not provide necessary features.  It should only be an exception when that rule is broken.
However, we use the typings on the Soho Angular Component interface, which breaks the encapsulation.
This does have the advantage that the control is therefor more agile.

####Component Unit Testing
 We have none yet but working on it

####Component Documentation
Eventual README per component?

###NPM Support
Working on it latest is at http://npm.infor.com in page
@infor/sohoxi-angular

This is WIP and un-tested but you should be able to reference it here

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
