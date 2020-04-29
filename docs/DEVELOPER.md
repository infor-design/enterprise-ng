# Enterprise Components for Angular Development Environment

## Install

- PC users suggest [ComEmu](https://conemu.github.io/) which works a bit better than CMD.
- Get the latest LTS **Node.js** release from <https://nodejs.org/en/> (version 8 or later)
- Get an Editor like [Visual Studio Code](https://code.visualstudio.com/) or [Atom](https://atom.io/) or your fav.

## Initial Setup with npm

- Clone The main repo fx `git clone https://github.com/infor-design/enterprise-ng.git`
- Open a command prompt to enterprise-ng
- Type `npm i`
- Type `npm run build`
- Type `npm start`

Optionally, the Angular CLI can be installed globally by using `npm install -g @angular/cli` but is not recommended since the global version may become out-of-sync with the version depended on by this library.

## Initial Setup with yarn

- Clone The main repo fx `git clone https://github.com/infor-design/enterprise-ng.git`
- Open a command prompt to enterprise-ng
- Type `yarn`
- Type `npm run build`
- Type `npm start`

## Component Structure

This section gives a brief overview of a component in the **enterprise ng** project.

The intention is to define the contract between the **enterprise** jQuery controls and their angular counterparts.

### Structure

```text
projects\ids-enterprise-ng\src\lib
  mywidget\
    soho-widget.d.ts
    soho-widget.component.ts
    soho-widget.component.html
    soho-widget.module.ts
    soho-widget.spec.ts
    README.md (optional)
```

The typing file (`soho-widget.d.ts`) contains the public API for the underlying **enterprise** jQuery controls, it also contains some internal information required to get the component working.  This should be referenced in each component it is required in.

```typescript
/**
 * Soho widget Control Typings.
 *
 * This file contains the Typescript mappings for the public
 * interface of the enterprise jQuery control.
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

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  widget(options?: SohoWidgetOptions): JQuery;
}
```

The types defined in here attempt to represent the interface exposed by the wrapped control, including:

- Simple types (number, string, ...)
- Union types (enums)
- Functions Prototypes (for source and response functions)
- Events (for triggered events)

It is **important** that the typings files accurately represent the underlying **enterprise** jQuery control, so any changes made to  the **enterprise** controls must be made to the corresponding typing file.

### The Component

The structure of a very simple **enterprise-ng** Component that wraps a ficticious jQuery Control called **widget** is defined below:

```typescript
/// <reference path="soho-widget.d.ts"/>

@Component({
  selector: 'soho-widget',
  template: './soho-widget.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWidgetComponent extends AfterViewInit, OnDestroy {
```

#### INPUTS

The inputs define the properties exposed by the component for integration with other Angular Components.  In this case we have the general *options* input and one for each discreet option, in this case *count*.

```typescript
/** Configuration options. */
@Input() options: SohoWidgetOptions = {};

@Input() set count(value: number) {
  this.options.count = value;
  if (this.widget) {
    this.widget.settings.count = value;
    this.ngZone.runOutsideAngular(() => this.widget.updated());
  }
}
```

#### OUTPUTS

The outputs are the events emitted by the component.

```typescript
@Output() built = new EventEmitter<SohoWidgetBuiltEvent>();
```

#### HOST BINDINGS

Then any host bindings required to annotate the markup, such as classes, or attributes.  Some of these may of course be controlled by other properties.

```typescript
@HostBinding('class.soho-widget') get isWidget() { return true; }
```

Then private member data:

```typescript
private element: JQuery;
private widget: SohoWidgetStatic;
```

#### METHODS

Expose the methods provided by the component wrapper. Ensure any soho control code is running outside of angular.

```typescript
makeWidget(): void {
  this.ngZone.runOutsideAngular(() => this.widget.makeWidget());
}
```

#### LIFE CYCLE

The constructor needs to store the injected element reference. NgZone is also required so
any soho control code can be placed outside of angular so change detection doesn't run
unnecessarily (This can happen due to soho registering dom event, calling setTimeout, and resolving Promises).

```typescript
constructor(private element: ElementRef, private ngZone: NgZone) {}
```

Then we handle the AfterViewEvent.

```typescript
ngAfterViewInit() {
  this.ngZone.runOutsideAngular(() => {
    // initialize the jquery component outside of angular.
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.widget(this.options);
    this.widet = this.jQueryElement.data('widget');

    this.jQueryElement.on('built', (e: JQueryObjectEvent, widgetId: string) =>
      NgZone.assertNotInAngularZone();

      // ensure that any events comeing from soho are emitted from inside angular.
      // emit the event from a timeout so that change detection will run.
      this.ngZone.run(() => setTimeout(() => this.built.emit({widgetId}), 1));
  })
}

```

Finally, the destructor.

```typescript
  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        // don't forget to remove any event listeners from the jquery element.
        this.jQueryElement.off();
      }
      if (this.widget) {
        this.widget.destroy();
        this.widget = null;
      }
    });
  }
```

## HTML

The HTML file should include any markup required for the control to work.

```html
  <soho-icon *ngIf="count > 1" [icon]='gear'></soho-icon>
  <ng-content></ng-content>
```

## Widget Component Module

Create the file `soho-widget.module.ts` and add the following:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SohoWidgetComponent } from './soho-widget.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoWidgetComponent
  ],
  exports: [
    SohoWidgetComponent
  ]
})
export class SohoWidgetModule {}

```

## Unit Testing

Angular-CLI uses **jasmine** to handle unit testing.  Simply add your unit test code to a file called **soho-widget.spec.ts** in the same folder as component.

These unit tests are run are part of the Continuous Integration build when code is pushed into the IDS enterprise-ng repository.

To run the tests simply run the command:

```sh
ng test
```

If you need to debug unit tests.

- Put a `fit(` on the test to focus the test.
- Place a `debugger` statement in the code where you want to debug.
- Run the tests with the command `npm run test:debug`
- press the debugger button in the browser
- open dev tools and refresh the page

## Pulling it all together

Add the new widget's module to the `SohoComponentsModule`:

```ts
import { NgModule } from '@angular/core';

...
import { SohoWidgetModule } from './widget/soho-widget.module';
...

@NgModule({
  imports: [
    ...
    SohoWidgetModule
  ],
  declarations: [
  ],
  exports: [
    ...
    SohoWidgetModule
  ]
})
export class SohoComponentsModule {}
```

## Building

To build and test the new component, you should first need to build the library:

```sh
npm run build:lib
```

Then add an application demo to the top level project, this involves:

- Adding a demo module, route and component in `src\app\widget`:
    - `widget.demo.ts`
    - `widget.demo.html`
    - `widget.route.ts`
    - `widget.module.ts`
- Adding a route to widget's demo module:

```json
 { path: 'widget', loadChildren: './widget/widget-demo.module#WidgetDemoModule'}
```

- Add a new entry to the application menu:

```html
<div class="accordion-header list-item"><a [routerLink]="['widget']"><span>Widgets</span></a></div>
```

Run the application (in the test server) using `ng s`.

To integrate this into your application simply include the **ids-enterprise-ng** package into your application, and include the **SohoComponentsModule** into your application module definition.  For further details, see the QuickStart guide.

## Using npm link

Using npm link allows you to test the changes you have made in a real project.

```sh
npm run build
cd dist\ids-enterprise-ng
npm link
```

In your target application type:

```sh
npm link ids-enterprise-ng
```

Make sure you have added the following to the `angular.json` file:

```json
"preserveSymlinks": true,
```

NOTE: if you run any `npm` command in the target project, the link will be reset.  So you would need to run the above command again.
