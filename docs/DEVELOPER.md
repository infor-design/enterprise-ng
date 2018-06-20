# Enterprise Components for Angular Development Environment

## Install

- PC users suggest [ComEmu](https://conemu.github.io/) which works a bit better than CMD.
- Get the latest LTS **Node.js** release from <https://nodejs.org/en/> (version 8 or later)
- Get an Editor like [Visual Studio Code](https://code.visualstudio.com/) or [Atom](https://atom.io/) or your fav.

## Initial Setup with npm

- Clone The main repo fx `git clone https://github.com/infor-design/enterprise-ng.git`
- Open a command prompt to enterprise-ng
- Type `npm install -g @angular/cli@latest`
- Type `npm i`
- Type `ng build`
- Type `ng serve`

## Initial Setup with yarn

- Clone The main repo fx `git clone https://github.com/infor-design/enterprise-ng.git`
- Open a command prompt to enterprise-ng
- Type `npm install -g @angular/cli@latest`
- Type `yarn`
- Type `ng build`
- Type `ng serve`

## Component Structure

This section gives a brief overview of a component in the **enterprise ng** project.
The intention is to define the contract between the **enterprise** jQuery controls and their angular counterparts.

### Structure

```text
soho\
  mywidget\
    soho-widget.d.ts
    soho-widget.component.ts
    soho-widget.component.html
    soho-widget.module.ts
    sogo-widget.spec.ts
    README.md (optional)
```

The typing file (soho-widget.d.ts) contains the public API for the underlying **enterprise** jQuery controls, it also contains some internal information required to get the component working.

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

interface JQuery {
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

Then any host bindings required to annoate the markup, such as classes, or attributes.  Some of these may of course be controlled by other properties.

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

      // Ensure that any events comeing from soho are emitted from inside angular.
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

## Pulling it all together

The component is then added into the consolidated typings using the top level typing file:

```text
soho\
  soho-components.d.ts
```

This file includes a reference to each of the typings files defined within each component, e.g.

```typescript
/// <reference path="./widget/soho-widget.d.ts" />
```

Add the component to the top level `soho-components.module.ts` file, by adding the widget component's module.

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

To integrate this into your application simply include the **ids-enterprise-ng** package into your application, and include the **SohoComponentsModule** into your application module definition.  For further details, see the QuickStart guide.
