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
     * Soho widget Control Typings.
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

Then any host bindings required to annoate the markup, such as classes, or attributes.  Some of these may of course be controlled by other properties.

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
