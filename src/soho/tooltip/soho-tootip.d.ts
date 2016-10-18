interface SohoTooltipOptions {
  content?: any, //Takes title attribute or feed content. Can be a function or jQuery markup
  offset?: number, //how much room to leave
  placement?: string,  //can be top/left/bottom/right/offset
  trigger?: string, //supports click and immediate and hover (and maybe in future focus)
  title?: string, //Title for Infor Tips
  beforeShow?: any, //Call back for ajax tooltip
  popover?: boolean , //force it to be a popover (no content)
  closebutton?: boolean, //Show X close button next to title in popover
  isError?: boolean, //Add error classes
  isErrorColor?: boolean, //Add error color only not description
  tooltipElement?: any, // ID selector for an alternate element to use to contain the tooltip classes
  keepOpen?: boolean, // Forces the tooltip to stay open in situations where it would normally close.
  extraClass?: string, // Extra css class
  maxWidth?: number // Toolip max width
}
interface SohoTooltipEvent extends BaseJQueryEventObject {
}
