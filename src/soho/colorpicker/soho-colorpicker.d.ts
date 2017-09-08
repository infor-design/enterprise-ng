/**
 * Soho colorpicker.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery colorpicker control.
 */

interface SohoColorOption {
  label?: string;
  number?: string;
  value?: string;
  border?: string;
}

interface SohoColorPickerOptions {
  /**  An array of objects of the form {label: 'Azure', number: '01', value: 'CBEBF4'} that can be used to populate the color grid. */
  colors: Array<SohoColorOption>;

  /** Show the label if true vs the hex value if false. */
  showLabel: boolean;

  /** If false only allow setting the value from the list (No typing) */
  editable: boolean;
}

interface SohoColorPickerEvent extends BaseJQueryEventObject {
}

/**
 * This interface represents the pub Api exposed by the
 * Soho control.
 */
interface SohoColorPickerStatic {
  show(): void;
}

/**
 * JQuery Integration
 */

interface JQueryStatic {
  colorpicker: SohoColorPickerStatic;
}

interface JQuery {
  colorpicker(options?: SohoColorPickerOptions): JQuery;
}
