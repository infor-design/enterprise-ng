interface SohoArrangeOptions {
  handle?: string; // The CSS class name of the handle element to connect.
  itemsSelector?: string; // The CSS selector to match all the sortable elements.
  connectWith?: boolean; // Optional CSS Selector to connect with when using two lists.
  isVisualItems?: boolean; // Use only index of visual items to trigger.
  placeholder?: string; // The html for the element that appears while dragging.
  placeholderCssClass?: string; // The class to add to the ghost element that is being dragged.
  useItemDimensions?: boolean; // If true, use item's dimensions to placeholder.
}

interface SohoArrangeStatic {
  settings: SohoArrangeOptions;
  updated: Function;
  destroy: Function;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  arrange(options?: SohoArrangeOptions): JQuery;
}

interface SohoArrangeEvent {
  event: JQuery.TriggeredEvent;
  status?: any;
}
