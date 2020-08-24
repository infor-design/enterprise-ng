
interface ContainmentOffset {
    left: number;
    top: number;
}

interface SohoDragOptions {
    axis?: string;
    clone?: boolean;
    cloneCssClass?: string;
    clonePosIsFixed?: boolean;
    cloneAppendTo?: string;
    containment?: string;
    obstacle?: string;
    underElements?: boolean;
    containmentOffset?: ContainmentOffset;
}

/**
 * This interface represents api exposed by the
 * Soho Drag control.
 */
interface SohoDragStatic {
    settings: SohoDragOptions;
    getElementsFromPoint: Function;
    updated: Function;
    destroy: Function;

}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
    drag(options?: SohoDragOptions): JQuery;
}

interface SohoDragEvent {
    event: JQuery.TriggeredEvent;
    ui?: any;
}
