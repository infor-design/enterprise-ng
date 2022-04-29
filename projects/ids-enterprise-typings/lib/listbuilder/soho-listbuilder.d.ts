interface SohoListBuilderOptions {
    /** Data to display. */
    dataset?: Object[];

    /** The CSS Class of the handle element */
    handle?: string;

    /** "Add" action button (takes a string representing a "data-action" attribute */
    btnAdd?: string;

    /** "Edit" action button (takes a string representing a "data-action" attribute */
    btnEdit?: string;

    /** "Delete" action button (takes a string representing a "data-action" attribute */
    btnDelete?: string;

    /** "GoUp" action button (takes a string representing a "data-action" attribute */
    btnGoUp?: string;

    /** "GoDown" action button (takes a string representing a "data-action" attribute */
    btnGoDown?: string;

    /** Add extra attributes like id's to the component **/
    attributes?: Array<Object> | Object;

    /** Html Template String of list. */
    template?: string;

    /** Html Template String of list item. */
    templateNewItem?: string;

    /** Html Template String of list item inner content. */
    templateItemContent?: string
}

interface SohoListBuilderStatic {
    settings: SohoListBuilderOptions;

    /** Updates the busy indicator with any new settings. */
    updated(options?: SohoListViewOptions): void;

    /** Destroy the component on completion. */
    destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
    listbuilder: SohoListBuilderStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
    listbuilder(options?: SohoListBuilderOptions): JQuery;
}