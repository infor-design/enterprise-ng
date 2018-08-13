# SoHoXi Angular Component : Accordion

## Description

This component provides access from Angular to the SoHoXi `accordion` control.

The Accordion is a grouped set of collapsible panels used to navigate sections of
related content. Each panel consists of two levels: the top level identifies the
category or section header, and the second level provides the associated options.

### Usage

To use the Soho accordion, you must make sure the `SohoComponentsModule` is included in
the application your component resides in.

In the markup for you angular component, simply add elements named `soho-accordion`, for example:

```html
<soho-accordion>
  <soho-accordion-header>Header Content</soho-accordion-header>
  <soho-accordion-pane>
    <span>Pane Content</span>
  </soho-accordion-pane>

  <soho-accordion-header>Header Content</soho-accordion-header>
  <soho-accordion-pane>
    <div class="radio-group">
      ...
    </div>
  </soho-accordion-pane>
  ...
</soho-accordion>
```

## Inputs

The 'accordion' component provides a number of options to control its behaviour, and presentation.

| Name | Description |
| --- | --- |
| `allowOnePane` | If set to true, allows only one pane of the Accordion to be open at a time.  If an Accordion pane is open, and that pane contains sub-headers, only one of the pane's sub-headers can be open at a time. (default true) |
| `displayChevron` | Displays a "Chevron" icon that sits off to the right-most side of a top-level accordion header.  Used in place of an Expander (+/-) if enabled. |
| `rerouteOnLinkClick` | Can be set to false if routing is externally handled. |
| `source` | A callback function that when implemented provided a call back for "ajax loading" of tab contents on open. |

Changes to these properties will dynamically update the component.

## Methods

| Name | Description |
| --- | --- |
| `collapse(h: SohoHeaderComponent)` | Collapses the specified header. |
| `collapseAll` | Collapses all accordion headers. |
| `disable` | Disable the accordion. |
| `enable` | Enable the accordion. |
| `expand(h: SohoHeaderComponent)` | Expand the given Panel on the Accordion. |
| `expandAll` | Expands all accordion headers, if possible. |
| `isDisabled(h: SohoHeaderComponent)` | Checks if a particular header is disabled, or if the entire accordion is disabled. |
| `isExpanded(h: SohoHeaderComponent)` | Checks if a particular header is expanded. |
| `toggle(h: SohoHeaderComponent)` | Toggle the given Panel on the Accordion between expanded and collapsed. |
| `updated` | Update the control with changes. |

## Outputs

This component fires the following events.

| Name | Description |
| --- | --- |
| `aftercollapse` | Fires after a pane is collapsed. |
| `afterexpand` | Fires after a pane is expanded. |
| `beforecollapse` | Fires before a pane is collapsed. |
| `beforeexpand` | Fires before a pane is expanded. |
| `beforeselect` | Fires before a pane is selected. |
| `collapse` | Fires when collapsed a pane is initiated. |
| `expand` | Fires when expanding a pane is initiated. |
| `followLink` | If the anchor is a real link, follow the link and die here. This indicates the link has been followed. |
| `selected` | Fires when a panel is opened. |

## Examples

<!-- markdownlint-disable MD013 -->

```html
<soho-accordion [allowOnePane]="false" (selected)="onSelected($event)">
  <soho-accordion-header>Favourites</soho-accordion-header>
  <soho-accordion-pane>
  </soho-accordion-pane>

  <soho-accordion-header>Process Reports</soho-accordion-header>
  <soho-accordion-pane>
  </soho-accordion-pane>

  <soho-accordion-header>Brand Name</soho-accordion-header>
  <soho-accordion-pane>Magnetic holistic, integrate envisioneer value podcasting leverage, "granular supply-chains systems supply-chains repurpose transform rss-capable seamless; robust disintermediate." Cluetrain: action-items rich metrics transition engage syndicate aggregate transform applications; revolutionize--infrastructures recontextualize platforms empower bandwidth incentivize, innovate, virtual portals whiteboard rich-clientAPIs intuitive. Synergies infrastructures; e-markets synthesize user-centric expedite. ROI world-class, ecologies utilize benchmark content--synergistic enhance. Syndicate synergistic collaborative enterprise ROI; folksonomies visionary holistic synergies grow.</soho-accordion-pane>

  <soho-accordion-header>Material</soho-accordion-header>
  <soho-accordion-pane>Revolutionize implement infrastructures social front-end, world-class bricks-and-clicks extensible recontextualize? User-contributed e-business relationships widgets bleeding-edge transform, "viral world-class, unleash sexy embrace cross-media best-of-breed wireless, functionalities." Markets, "transition architectures, redefine infomediaries world-class back-end harness, mindshare blogospheres; schemas disintermediate rich," benchmark integrated markets blogging synergies dynamic social back-end convergence. Reinvent A-list A-list B2C rss-capable, mesh bandwidth mission-critical disintermediate strategize networks distributed integrated bleeding-edge rss-capable partnerships incubate, web-enabled e-markets. A-list channels enhance citizen-media, value solutions beta-test platforms enable interfaces, transition interfaces one-to-one expedite scalable.</soho-accordion-pane>
</soho-accordion>
```

<!-- markdownlint-enable MD013 -->
