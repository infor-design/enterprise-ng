# IDS Angular Component: Row/Column Grid

## Description

Soho uses a 12 column grid for most designs. To setup a new 12 column grid, define a row element using `<div soho-row>`. Then define the columns you want in that row. They should always add to 12. For example, below we have a 2 column and 10 column element. This grid is fixed not fluid. For a more advanced grid consider adopting the web component [Ids Layout Grid](https://github.com/infor-design/enterprise-wc/blob/main/src/components/ids-layout-grid/README.md) instead.

```html
<div soho-row>
  <div soho-columns cols="two">Content</div>
  <div soho-columns cols="ten">Content</div>
</div>
```

## Simplified Grid

The simplified grid handles the basic 1,2,3,4 column layouts in a more semantic way. This example is the same as a six by six grid but uses the cols of `one-half`, etc. The following are supported `full`, `full-width`, `one-half`, `one-third`, `two-thirds`, `one-fourth`, `one-fifth`.

You can also add class `one-half-mobile` and at the lowest breakpoint the grid will break down to two columns instead of one.

```html
<div soho-row>
  <div soho-columns cols="one-half">
    <div class="content-area">
      <h2>One</h2>
    </div>
  </div>

  <div soho-columns cols="one-half">
    <div class="content-area">
      <h2>Two</h2>
    </div>
  </div>
</div>
```

## Indent Modifier

We added a setting modifier of `indent="none"`, this will removing all margin indents on the grid. This can be used to nest responsive grids without the added gutters. See [the nested grid example](ids-enterprise-ng-demo/grid-nesting-no-margins) for an example.

## Padding and Size Modifiers

In addition we added a few extra class that can be added to the grid `row` element as follows:

- `padding="top"` - adds additional top padding for a row (30px) to give some extra top spacing
- `padding="small-top"` - adds a bit of additional top padding for a row (10px)
- `padding="none-top"` - removes all top padding (0px)
- `padding="none-bottom"` - removes all bottom margins  (0px)
- `padding="small-bottom"` - adds a bit of bottom top padding for a row (10px)
- `padding="extended-bottom"` - adds a lot of bottom top padding for a row (45px)
- `padding="bottom` - adds additional bottom padding for a row (30px) to give some extra spacing
- `width="full"` - Makes the row have 100% height
- `height="full"` - Makes the column have 100% width except when below the responsive breakpoint.

## Flex/Responsive Modifiers (HERE TODO)

We added a few css flex modifiers for different ways to line up labels and act responsively. See [wrapped labels](./demo/components/form/test-wrapped-labels) for an example. Adding the `form-responsive` class to the row or a parent will make all inputs become responsive in the grid rather than their default sizes. Adding the class `flex-align-bottom` to the row will make the bottoms align of the inputs and this will make longer labels line up as the page is resized.

```html
<div class="form-responsive">
    <div class="row flex-align-bottom">
      <div class="three columns">
        <div class="field">
          <label for="font-used">Font to be Used</label>
          <input id="font-used" value="Arial Monospaced">
        </div>
      </div>
```

We have a few examples of input fields in the responsive grid. These can be found under the form layout examples. See [Inputs in the Responsive Grid](./demo/components/form/example-inputs) and [Inputs in the Responsive Simplified Grid](./demo/components/form/example-inputs-simple) for examples.

## Breakpoints

The grid uses the following breakpoints.

```css
$breakpoint-phone: 320px;
$breakpoint-slim: 400px;
$breakpoint-big-phone: 480px;
$breakpoint-phablet: 610px;
$breakpoint-phone-to-tablet: 767px;
$breakpoint-wide-tablet: 968px;
$breakpoint-tablet-reduced: 1040px;
$breakpoint-tablet-to-desktop: 1280px;
$breakpoint-desktop-to-extralarge: 1600px;
```

For guidance on how to use the breakpoints to tailor your layout for different device sizes, see the [Grid & Breakpoints guidelines](https://design.infor.com/guidelines/layout/grid)

## Accessibility

- No special requirements, but do make sure that page tab order is respected.

## Breaking Changes (Phoenix)


- Removed the `class="row"` and replaced it with the `soho-row` attribute
- Removed the `class="column"` and replaced it with the `soho-column` attribute and placed the number of columns in a col attribute `cols="twelve"`
- Removed the `top-padding` class and replaced with the `padding="top"` attribute.
- Removed the `small-top-padding` class and replaced with the `padding="small-top"` attribute.
- Removed the `no-top-padding` class and replaced with the `padding="none-top"` attribute.
- Removed the `no-bottom-margin` class and replaced with the `padding="none-bottom"` attribute.
- Removed the `small-bottom-padding` class and replaced with the `padding="small-bottom"` attribute.
- Removed the `extended-bottom-padding` class and replaced with the `padding="extended-bottom"` attribute.
- Removed the `bottom-padding` class and replaced with the `padding="bottom"` attribute.
- Removed the `full-width` class and replaced with the `width="full"` attribute.
- Removed the `full-height` class and replaced with the `height="full"` attribute.
- Removed the `full-width` class on columns and replaced with the `cols="twelve"
- Removed the `full-height` class on columns and replaced with the `height="full"`

Some Search and replace patterns to help with the migration:

- `div class="row demo-grid"` should be replaced with the `div soho-row`.
- `div class="column one"` should be replaced with the `div soho-columns cols="one"`.
- `div class="one column"` should be replaced with the `div soho-columns cols="one"`.
- `div class="two columns"` should be replaced with the `div soho-columns cols="two"`.
- `div class="ten columns"` should be replaced with the `div soho-columns cols="ten"`.
- `div class="eleven columns"` should be replaced with the `div soho-columns cols="eleven"`.
- `class="full-height column"` should be replaced with the `soho-columns cols="full-height"`.
- `class="full-width column"` should be replaced with the `soho-columns cols="full-width"`.
- `class="full column"` should be replaced with the `soho-columns cols="full-width"`.
- `div class="one-half column"` should be replaced with the `div soho-columns cols="one-half"`.
- `div class="one-third column"` should be replaced with the `div soho-columns cols="one-third"`.
- `div class="two-thirds column"` should be replaced with the `div soho-columns cols="two-thirds"`.
- `div class="one-fifth column"` should be replaced with the `div soho-columns cols="one-fifth"`.
- `div class="one-fifth column one-half-mobile"` should be replaced with the `soho-columns cols="one-fifth" mobile="one-half"`.
- `div class="row no-indent"` should be replaced with the `div soho-row indent="none"` (note that it may be mixed with other classes).
