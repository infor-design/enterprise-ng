interface SohoListBuilderOptions {
    dataset?: Object[];
    handle?: string;
    btnAdd?: string;
    btnEdit?: string;
    btnDelete?: string;
    btnGoUp?: string;
    btnGoDown?: string;
    attributes?: Array<Object> | Object;
    template?: string;
    templateNewItem?: string;
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