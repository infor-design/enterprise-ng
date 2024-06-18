# IDS Angular Component: Row/Column Grid

## Description

Soho uses a 12 column grid for most designs. To setup a new 12 column grid, define a row element using `<div soho-row>`. Then define the columns you want in that row. They should always add to 12. For example, below we have a 2 column and 10 column element. This grid is fixed not fluid. For a more advanced grid consider adopting the web component [Ids Layout Grid](https://github.com/infor-design/enterprise-wc/blob/main/src/components/ids-layout-grid/README.md) instead.

```html
<div soho-row>
  <div soho-columns cols="two">Content</div>
  <div soho-columns cols="ten">Content</div>
</div>
```

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

## Converting to a directive

You can use the following search and replace rules such as:

```sh
div class="row demo-grid" -> div soho-row
div class="column one" -> soho-columns cols="one"
div class="two columns" -> soho-columns cols="two"
class="full-height column" -> soho-columns cols="full-height"
class="full-width column" -> soho-columns cols="full-width"
class="full column" -> soho-columns cols="full-width"
```

## Simplified Grid

The simplified grid handles the basic 1,2,3,4 column layouts in a more semantic way. This example is the same as a six by six grid but uses the classes `one-half`, etc. The following are supported `full`, `full-width`, `one-half`, `one-third`, `two-thirds`, `one-fourth`, `one-fifth`.

You can also add class `one-half-mobile` and at the lowest breakpoint the grid will break down to two columns instead of one.

```html
<div class="row">
  <div class="one-half column">
    Content
  </div>

  <div class="one-half column">
    Content
  </div>
</div>
```

## Flex/Responsive Modifiers

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

## Other Modifiers

We added an class modifier of `no-indent`, this will removing all margin indents on the grid. This can be used to nest responsive grids without the added gutters. See [the nested grid example](./demo/components/grid/example-nesting-no-margins) for an example.

In addition we added a few extra class that can be added to the grid `row` element as follows:

- `top-padding` - adds additional top padding for a row (30px) to give some extra spacing
- `bottom-padding` - adds additional bottom padding for a row (30px) to give some extra spacing
- `small-top-padding` - adds a bit of additional top padding for a row (10px)
- `small-bottom-padding` - adds a bit of bottom top padding for a row (10px)
- `extended-bottom-padding` - adds a lot of bottom top padding for a row (45px)
- `no-top-padding` - removes all top padding
- `no-bottom-margin` - removes all bottom margins
- `full-height` - Makes the row have 100% height
- `full-width` - Makes the column have 100% width except when below the responsive breakpoint

## Breakpoints

There are 7 breakpoint sizes you can target to tailor your layout to the specific device size:

- `breakpoint-phone`, `breakpoint-slim`
- `breakpoint-phablet`
- `breakpoint-phone-to-tablet`
- `breakpoint-wide-tablet`
- `breakpoint-tablet-to-desktop`
- `breakpoint-desktop-to-extralarge`

See [`src/core/_config.scss`](https://github.com/infor-design/enterprise/blob/main/src/core/_config.scss#L945-L954) and search for "breakpoint sizes".

For guidance on how to use the breakpoints to tailor your layout for different device sizes, see the [Grid & Breakpoints guidelines](https://design.infor.com/guidelines/layout/grid)

## Accessibility

- No special requirements, but do watch that tab order is respected.
