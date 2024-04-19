# Infor Design Enterpriise (SohoXi) Angular Component : Tag

## Description

This component provides access from Angular to the `tag` JQuery control.

### Usage

To add a `tag` to a component requires adding the module `SohoTagModule` into the hosting component. If you
have included the top level Soho module then this will be already included.

Tags are simple span elements with the class `tag`. They can be mixed in with other elements like lists, grids and search fields. You can optionally add a few classes to add color or status such as `error` for red, `good` to be green and `alert` for yellow. Since you should not use color alone to indicate state, this should be either supplemented with off-screen labels or visual labels near the element explaining the state.

## Methods

| Name | Description |
| --- | --- |
| updated() | updates the settings |

## Events

| Name | Description |
| --- | --- |
| beforeRemoveTag | Fires before the tag is removed from it's container. |
| afterRemoveTag | Fires after the tag has been removed from it's container. |
| click | Fires when a tag has been clicked. |

## Example

For example:

```html
<div soho-tag-list>
  <span soho-tag>#Tagged</span>
  <span soho-tag="secondary">#Tagged</span>
  <span soho-tag="error"><span class="audible">Error</span>Delayed</span>
  <span soho-tag="good">Open Order</span>
  <span soho-tag="alert"><span class="audible">Alert</span>Help Order</span>
  <a href="#" soho-tag [isClickable]="true">#Clickable</a>
  <a href="#" soho-tag [isDismissible]="true">#Clickable</a>
</div>
```

## Phoenix Conversion Notes
PROS (also works for wc dependency)
  - Declaring setters/getters/custom events is simpler in Angular via @Input/@Output decorators
    - @Input/@Output decorators have useful configs like `transform: booleanAttribute` to convert input
    - similar to what we want to do in WC with setter/getter decorators in the future
  - Template/Class/Attribute binding is much easier/shorter in angular
  - If done the angular way, angular auto handles unbinding events/observables and component cleanup
  - We get to use rxjs which offers a more declarative approach for reacting to component state changes
  - Rebuild/live-reload is faster than our current wc rebuild/live-reload project
  - Using ids-foundation style token was pretty seamless, but still need to figure out how to properly import them
  - Security built-in (ie. safe/unsafe html injections)
  - Dependency injection is nifty
  - Didn't need ngZone

CONS
  - Need to accomodate older/removed JQUERY interfaces (ie. tag settings)
  - new way to figure out accessibility 
  - Going this native ng route will be more of a rewrite than a copy/paste from WC project
    - DOM manipulation/Data Binding/Event Binding is very different in angular
    - Our mixins will need to be re written as Angular Directives
  - Difference in implementation will make feature/path parity difficult across projects
  - Trouble finding way to self-destruct component
    - removing host element from DOM does via nativeElement.remove() does not call ngOnDestroy()
    - could mean that angular skips it's teardown process