/* eslint-disable @angular-eslint/no-input-rename */
import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    NgZone,
    OnDestroy
} from "@angular/core";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[soho-stepchart]',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoStepChartComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
    private options: SohoStepChartOptions = {};

    @HostBinding('class.step-chart') get isStepChart() {
        return true;
    }

    /** The number of steps to show. */
    @Input() set steps(steps: number) {
        this.options.steps = steps;
        if (this.stepchart) {
            this.stepchart.settings.steps = steps;
            this.updateRequired = true;
        }
    }

    /** The number of steps complete (linear). */
    @Input() set completed(completed: number) {
        this.options.completed = completed;
        if (this.stepchart) {
            this.stepchart.settings.completed = completed;
            this.updateRequired = true;
        }
    }

    /** The number of the in progress step (linear). */
    @Input() set inProgress(inProgress: number) {
        this.options.inProgress = inProgress;
        if (this.stepchart) {
            this.stepchart.settings.inProgress = inProgress;
            this.updateRequired = true;
        }
    }

    /** The icon to display fx. 'icon-error', 'icon-success' */
    @Input() set iconType(iconType: boolean) {
        this.options.iconType = iconType;
        if (this.stepchart) {
            this.stepchart.settings.iconType = iconType;
            this.updateRequired = true;
        }
    }

    /**
     * The completed text or uses a localized 'N of N Steps complete'.
     *  You can use {0} and {1} to replace n of n in the string.
     */
    @Input() set completedText(completedText: string) {
        this.options.completedText = completedText;
        if (this.stepchart) {
            this.stepchart.settings.completedText = completedText;
            this.updateRequired = true;
        }
    }

    /**
     * The additional text to show on the right. Defaults to none. 
     * You can use {0} to replace with the steps remaining count and {1} to replace the number of steps.
     */
    @Input() set extraText(extraText: string) {
        this.options.extraText = extraText;
        if (this.stepchart) {
            this.stepchart.settings.extraText = extraText;
            this.updateRequired = true;
        }
    }

    /** The color to show completed steps. Defaults to primary color. */
    @Input() set completedColor(completedColor: string) {
        this.options.completedColor = completedColor;
        if (this.stepchart) {
            this.stepchart.settings.completedColor = completedColor;
            this.updateRequired = true;
        }
    }

    /** The color to steps when all are completed. Defaults to primary color. */
    @Input() set allCompletedColor(allCompletedColor: string) {
        this.options.allCompletedColor = allCompletedColor;
        if (this.stepchart) {
            this.stepchart.settings.allCompletedColor = allCompletedColor;
            this.updateRequired = true;
        }
    }

    /** The color to show in-progress steps. Defaults to ruby02. */
    @Input() set inProgressColor(inProgressColor: string) {
        this.options.inProgressColor = inProgressColor;
        if (this.stepchart) {
            this.stepchart.settings.inProgressColor = inProgressColor;
            this.updateRequired = true;
        }
    }

    /** Add extra attributes like id's to the chart elements. 
     * For example { name: 'id', value: 'my-unique-id' } 
     */
    @Input() set attributes(attributes: Array<Object> | Object) {
        this.options.attributes = attributes;

        if (this.stepchart) {
            this.stepchart.settings.attributes = attributes;
            this.updateRequired = true;
        }
    }

    private jQueryElement?: JQuery;
    private stepchart?: SohoStepChart | null;
    private updateRequired = false;

    constructor(
        private element: ElementRef,
        private ngZone: NgZone,
    ) { }

    ngAfterViewInit() {
        this.ngZone.runOutsideAngular(() => {
            // assign element to local variable
            this.jQueryElement = jQuery(this.element.nativeElement);

            // initialise the tag control
            this.jQueryElement.stepchart(this.options);

            // extract the api
            this.stepchart = this.jQueryElement.data('stepchart');
        });
    }

    ngAfterViewChecked() {
        if (this.stepchart && this.updateRequired) {
            this.ngZone.runOutsideAngular(() => this.stepchart?.updated(this.stepchart.settings));
            this.updateRequired = false;
        }
    }

    ngOnDestroy() {
        this.ngZone.runOutsideAngular(() => {
            if (this.jQueryElement) {
                // remove the event listeners on this element.
                this.jQueryElement.off();
                this.jQueryElement = undefined;
            }

            // Destroy any widget resources.
            if (this.stepchart) {
                // Error occurs in teardown in enterprise
                // this.stepchart.destroy();
                this.stepchart = null;
            }
        });
    }
}