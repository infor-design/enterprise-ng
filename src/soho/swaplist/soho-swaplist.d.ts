/**
 * Soho SwapList.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho swaplist control.
 */

/**
 * Swap List Options
 */
interface SohoSwapListOptions {
    /**
    * datasets
    */
    available?: any[];
    selected?: any[];
    additional?: any[];

    // Main containers
    // 'availableClass': '.available',
    // 'selectedClass': '.selected',
    // 'additionalClass': '.full-access',

    // Action buttons
    // 'availableBtn': '.btn-moveto-selected',
    // 'selectedBtnLeft': '.btn-moveto-left',
    // 'selectedBtnRight': '.btn-moveto-right',
    // 'additionalBtn': '.btn-moveto-selected',
}

/**
 * This interface represents the public API exposed by the
 * swaplist.
 */
interface SohoSwapListStatic {

    /**
     * Current in use options.
     */
    settings: SohoSwapListOptions;

    /**
     * Mark the contro as readonly.
     */
    readonly(): void;

    /**
     * Forces an update of the control to reflect any changes made in the settings object.
     */
    updated(): void;

    /**
     * Disable the control.
     */
    disable(): void;

    /**
     * Enable the control.
     */
    enable(): void;

    /**
     * Get available items
     */
    getAvailable(): any[];

    /**
     * Get selected items
     */
    getSelected(): any[];

    /**
     * get additional items
     */
    getAdditional(): any[];

    /**
     * Destroys any resources created by the control.
     */
    destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
    swaplist: SohoSwapListStatic;
}

interface JQuery {
    swaplist(options: SohoSwapListOptions): JQuery;
}
