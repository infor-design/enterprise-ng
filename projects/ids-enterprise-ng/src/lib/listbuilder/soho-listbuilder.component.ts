import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, HostBinding, Input, NgZone, OnDestroy, QueryList, ViewChild } from "@angular/core";
import { SohoListViewItemComponent } from "../listview";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[soho-listbuilder]',
    templateUrl: 'soho-listbuilder.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoListBuilderComponent implements AfterViewInit, OnDestroy, AfterViewChecked {
    @HostBinding('class.listbuilder') get isListbuilder() {
        return true;
    }

    /**
     * Local variables
     */
    private jQueryElement?: JQuery;
    private listbuilder?: SohoListBuilderStatic | null;
    private options: SohoListBuilderOptions = {};

     /**
     * Force a update to fire next viewChecked.
     */
    public updateRequired?: boolean;

    /**
     * Constructor.
     */
    constructor(
        private ngZone: NgZone
    ) { }

    // Used to locate the listBuilderReference in the HTML to init the component through jQuery
    @ViewChild('listbuilder', { static: true }) listBuilderRef: ElementRef | undefined;

    @ContentChildren(SohoListViewItemComponent) items?: QueryList<SohoListViewItemComponent>;

    @Input() sohoListBuilderElementId?: string;

    /**
     * String of classes to append to the class for the list-view div element
     */
    @Input() class?: string;

    get listClass() {
        let classes = 'listbuilder';
        if (this.class) {
          classes += ` ${this.class}`;
        }
        return classes;
    }

    /**
     * Array of data
     */
    @Input() set dataset(value: Object[] | undefined) {
        this.options.dataset = value;
        if (this.jQueryElement && this.listbuilder) {
            this.listbuilder.settings.dataset = value;
            this.updateRequired = true;
        }
    }

    get dataset(): Object[] | undefined {
        return this.options.dataset;
    }

    /** The CSS Class of the handle element */
    @Input() set handle(value: string) {
        this.options.handle = value;
        if (this.jQueryElement && this.listbuilder) {
            this.listbuilder.settings.handle = value;
            this.updateRequired = true;
        }
    }

    /** "Add" action button (takes a string representing a "data-action" attribute */
    @Input() set btnAdd(value: string) {
        this.options.btnAdd = value;
        if (this.jQueryElement && this.listbuilder) {
            this.listbuilder.settings.btnAdd = value;
            this.updateRequired = true;
        }
    }
    
    /** "Edit" action button (takes a string representing a "data-action" attribute */
    @Input() set btnEdit(value: string) {
        this.options.btnEdit = value;
        if (this.jQueryElement && this.listbuilder) {
            this.listbuilder.settings.btnEdit = value;
            this.updateRequired = true;
        }
    }

    /** "Delete" action button (takes a string representing a "data-action" attribute */
    @Input() set btnDelete(value: string) {
        this.options.btnDelete = value;
        if (this.jQueryElement && this.listbuilder) {
            this.listbuilder.settings.btnDelete = value;
            this.updateRequired = true;
        }
    }

    /** "GoUp" action button (takes a string representing a "data-action" attribute */
    @Input() set btnGoUp(value: string) {
        this.options.btnGoUp = value;
        if (this.jQueryElement && this.listbuilder) {
            this.listbuilder.settings.btnGoUp = value;
            this.updateRequired = true;
        }
    }

    /** "GoDown" action button (takes a string representing a "data-action" attribute */
    @Input() set btnGoDown(value: string) {
        this.options.btnGoDown = value;
        if (this.jQueryElement && this.listbuilder) {
            this.listbuilder.settings.btnGoDown = value;
            this.updateRequired = true;
        }
    }

    /** Add extra attributes like id's to the chart elements. For example `attributes: { name: 'id', value: 'my-unique-id' } */
    @Input() set attributes(attributes: Array<Object> | Object | undefined) {
        this.options.attributes = attributes;
        if (this.jQueryElement && this.listbuilder) {
          this.listbuilder.settings.attributes = attributes;
          this.updateRequired = true;
        }
    }

    /** Html Template String of list. */
    @Input() set template(value: string) {
        this.options.template = value;
        if (this.jQueryElement && this.listbuilder) {
        this.listbuilder.settings.template = value;
        this.updateRequired = true;
        }
    }

    /** Html Template String of list item. */
    @Input() set templateNewItem(value: string) {
        this.options.templateNewItem = value;
        if (this.jQueryElement && this.listbuilder) {
        this.listbuilder.settings.templateNewItem = value;
        this.updateRequired = true;
        }
    }

    /** Html Template String of list item inner content. */
    @Input() set templateItemContent(value: string) {
        this.options.templateItemContent = value;
        if (this.jQueryElement && this.listbuilder) {
        this.listbuilder.settings.templateItemContent = value;
        this.updateRequired = true;
        }
    }

    ngAfterViewInit(): void {
        if (!this.listBuilderRef) {
            throw Error('Unable to find listbuilder reference...');
        }

        this.ngZone.runOutsideAngular(() => {
            this.jQueryElement = jQuery(this.listBuilderRef?.nativeElement);
            this.jQueryElement.listbuilder(this.options);
            this.listbuilder = this.jQueryElement.data('listbuilder');
        });
    }

    ngAfterViewChecked() {
        if (this.updateRequired) {
          this.ngZone.runOutsideAngular(() => this.listbuilder?.updated());
          this.updateRequired = false;
        }

        this.items?.changes.subscribe(() => {
            this.updateRequired = true;
        });
    }
    
    ngOnDestroy() {
        this.ngZone.runOutsideAngular(() => {
            if (this.jQueryElement) {
            this.jQueryElement.off();
        }
        
        if (this.listbuilder) {
            this.listbuilder.destroy();
            this.listbuilder = null;
          }
        });
    }
}