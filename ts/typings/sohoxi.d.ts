
declare var Locale;

declare var Formatters:Formatters;

interface Formatters extends Window
{
    Text(row:number, cell:number, value:string): string;
    Readonly(row:number, cell:number, value:string): string;
    Date(row:number, cell:number, value:string): string;
    Decimal(row:number, cell:number, value:string, col:any): number;
    Integer(row:number, cell:number, value:string, col:any): number;
    Template(row:number, cell:number, value:string, col:any, item:any): string;
    Drilldown() : String;
    Checkbox(row:number, cell:number, value:string, col:any): string;
    SelectionCheckbox(row:number, cell:number, value:string, col:any) : string;
    Actions(row:number, cell:number, value:string, col:any) : string;
    Textarea(row:number, cell:number, value:string): string;
    Expander(row:number, cell:number, value:string): string;
    ClassRange(row:number, cell:number, value:string, col:any): any;
    Badge(row:number, cell:number, value:string, col:any) : string;
    Tag(row:number, cell:number, value:string, col:any) : string;
    Alert(row:number, cell:number, value:string, col:any) : string;
    Color(row:number, cell:number, value:string, col:any) : string;
    Button(row:number, cell:number, value:string, col:any) : string;
    Dropdown(row:number, cell:number, value:string, col:any) : string;
    Favorite(row:number, cell:number, value:string, col:any) : string;
}

interface JQuery
{
    applicationmenu(options:any): JQuery;
    accordion(options?:any): JQuery;
    toast(options?:any): JQuery;
    message(options?:any): JQuery;

    datagrid : DataGrid;

    initialize(lang: string): JQuery;
    toolbar(options?: any): JQuery;
    header(options?: any): JQuery;
    tabs(): JQuery;

    disable(): JQuery;
    enable(): JQuery;

    modal(op:string): JQuery;
    removeError();

    dropdown(options?: any): JQuery;
    datepicker(DatePickerOptions?: any): JQuery;
    lookup(options?: any): JQuery;

    chart(options?: any): JQuery;
}

interface DataGrid
{
    (options:any):JQuery;
    selectedRows: <T>() => T;
    loaddata:<T>() => T;
    pageSize:<T>(dataSet:any, pagerInfo:any) => T;
}

declare var Tmpl:Tmpl;

interface Tmpl
{
    compile(template:string);
}

interface DatePickerOptions
{
    dateFormat       ?: string;
    isTimepicker     ?: boolean;
    forceHourMode    ?: any;
    timepickerMarkup ?: string;
    disable          ?: DatePickerDisable;
}
interface DatePickerDisable
{
    dates            ?: any;
    minDate          ?: string;
    maxDate          ?: string;
    dayOfWeek        ?: any;
    isEnable         ?: boolean;
}
interface TimePickerOptions
{
    timeFormat        ?: string;
    minuteInterval    ?: number;
    mode              ?: string;
    roundToInterval   ?: boolean;
    forceHourMode     ?: any
}
interface DropdownOptions
{
    closeOnSelect     ?: boolean;
    maxSelected       ?: any;
    moveSelectedToTop ?: boolean;
    multiple          ?: boolean;
    noSearch          ?: boolean;
    source            ?: any;
    empty             ?: boolean;
}
interface TextareaOptions
{
    characterCounter   ?: boolean;
    printable          ?: boolean;
    charRemainingText  ?: any;
    charMaxText        ?: any;
}
// rich text editor
interface EditorOptions
{
    buttons            ?: any;
    delay              ?: number;
    diffLeft           ?: number;
    diffTop            ?: number;
    firstHeader        ?: string;
    secondHeader       ?: string;
    placeholder        ?: any;
    anchor             ?: any;
    image              ?: any;
}
interface CheckboxOptions
{

}
interface RadiobuttonOptions
{

}
interface MaskOptions
{
    pattern             ?: string;
    placeholder         ?: string;
    definitions         ?: any;
    groupComplete       ?: boolean;
    mode                ?: string;
    mustComplete        ?: boolean;
    negative            ?: boolean;
    number              ?: boolean;
    processOnInitialize ?: boolean;
    thousandsSeparator  ?: boolean;
    showSymbol          ?: string;
}
interface ModalOptions
{
    title       ?: string;
    trigger     ?: string;     //Supports click, immediate
    buttons     ?: Array<any>; //Pass in the Buttons
    isAlert     ?: boolean;    //Adds alert dialog role
    content     ?: any;        //Ability to pass in dialog html content
    cssClass    ?: string;     //Append a css class to top level
    autoFocus   ?: boolean;
    id          ?: string;     //Optionally tag a dialog with an id
    frameHeight ?: number;     //Extra Height
}

interface MessageOptions
{
    title       ?: string;  //Title text or content shown in the message
    isError     ?: boolean; //Show Title as an Error with an Icon
    message     ?: string;  //The message content or text
    width       ?: string;  //specify a given width or fit to content with auto
    buttons     ?: any,     //Passed through to modal
    cssClass    ?: string,
    returnFocus ?: any      //Element to focus on return
}

interface ToolbarOptions
{
    id              ?: string;
    isHeaderToolbar ?: boolean;
    buttons         ?: Array<any>
    submenu         ?: any;
    pageTitle       ?: string;
    appTitle        ?: string;
    search          ?:
    {
        id         ?: string;
        label      ?: string;
        buttonSpec ?: string;
        isSearch   ?: boolean;
    };
    detectChange   ?: boolean;
}
