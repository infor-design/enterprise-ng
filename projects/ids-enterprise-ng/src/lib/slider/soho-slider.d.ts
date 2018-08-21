/**
 * Soho Slider Control
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho Slider control.
 *
 */

/**
 * The Slider Control options
 */
interface SohoSliderOptions {
  /** Minimum Value */
  min?: number;

  /** Maximum Value */
  max?: number;

  /** value or a range of values */
  value?: number[];

  /** Increment or decrement by step value */
  step?: number;

  /** Choose a range of values or select a value */
  range?: boolean;

  /** An array of ticks that provide the value, description and color details */
  ticks?: SohoSliderTick[];

  /** Persist tooltip */
  persistTooltip?: boolean;

  /** Tooltip Content */
  tooltipContent?: string[];
}

/**
 * Soho Slider Tick Data
 */
interface SohoSliderTick {
  value: number;
  description: string;
  color?: string;
}

/**
 * Type safe Slider event object.
 */
interface SohoSliderEvent extends JQuery.Event {
  data: any;
}

/**
 * This interface represents the public API exposed by the
 * slider.
 */
interface SohoSliderStatic {
  /**
   * Disable the control.
   */
  disable(): void;

  /**
   * Enable the control.
   */
  enable(): void;

  /**
   * Mark the control as readonly.
   */
  readonly(): void;

  /**
   * Destroys any resources created by this control.
   */
  destroy(): void;

  /**
   * Forces an update of the control to reflect any changes made in the settings object.
   */
  updated(): void;

  /**
   * get the low and high value of the slider.
   */
  value(): number[];

  /**
   * Sets the new low value and high value of the slider.
   */
  setValue(lowVal: number, highVal: number): number[];
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  slider: SohoSliderStatic;
}

interface JQuery {
  slider(options: SohoSliderOptions): JQuery;
}
