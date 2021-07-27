/* eslint-disable @angular-eslint/no-input-rename */
import { 
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
    selector: 'div[soho-stepchart]',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoStepChartComponent implements AfterViewInit, OnDestroy {
    private options: SohoStepChartOptions = {};

    private stepchart?: SohoStepChart | null;

    private jQueryElement?: JQuery;

    @HostBinding('class.step-chart') get isStepChart() {
        return true;
    }

    @Input() set steps(steps: number) {
        this.options.steps = steps;
        if (this.stepchart) {
            this.stepchart.settings.steps = steps;
            this.ngZone.runOutsideAngular(() => this.stepchart?.updated(this.options));
        }
    }

    @Input() set completed(completed: number) {
        this.options.completed = completed;
        if (this.stepchart) {
            this.stepchart.settings.completed = completed;
            this.ngZone.runOutsideAngular(() => this.stepchart?.updated(this.options));
        }
    }

    @Input() set inProgress(inProgress: number) {
        this.options.inProgress = inProgress;
        if (this.stepchart) {
            this.stepchart.settings.inProgress = inProgress;
            this.ngZone.runOutsideAngular(() => this.stepchart?.updated(this.options));
        }
    }

    @Input() set iconType(iconType: boolean) {
        this.options.iconType = iconType;
        if (this.stepchart) {
            this.stepchart.settings.iconType = iconType;
            this.ngZone.runOutsideAngular(() => this.stepchart?.updated(this.options));
        }
    }

    @Input() set completedText(completedText: string) {
        this.options.completedText = completedText;
        if (this.stepchart) {
            this.stepchart.settings.completedText = completedText;
            this.ngZone.runOutsideAngular(() => this.stepchart?.updated(this.options));
        }
    }

    @Input() set extraText(extraText: string) {
        this.options.extraText = extraText;
        if (this.stepchart) {
            this.stepchart.settings.extraText = extraText;
            this.ngZone.runOutsideAngular(() => this.stepchart?.updated(this.options));
        }
    }

    @Input() set completedColor(completedColor: string) {
        this.options.completedColor = completedColor;
        if (this.stepchart) {
            this.stepchart.settings.completedColor = completedColor;
            this.ngZone.runOutsideAngular(() => this.stepchart?.updated(this.options));
        }
    }

    @Input() set allCompletedColor(allCompletedColor: string) {
        this.options.allCompletedColor = allCompletedColor;
        if (this.stepchart) {
            this.stepchart.settings.allCompletedColor = allCompletedColor;
            this.ngZone.runOutsideAngular(() => this.stepchart?.updated(this.options));
        }
    }

    @Input() set inProgressColor(inProgressColor: string) {
        this.options.inProgressColor = inProgressColor;
        if (this.stepchart) {
            this.stepchart.settings.inProgressColor = inProgressColor;
            this.ngZone.runOutsideAngular(() => this.stepchart?.updated(this.options));
        }
    }

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
    
    ngOnDestroy() {
        this.ngZone.runOutsideAngular(() => {
            if (this.jQueryElement) {
                // remove the event listeners on this element.
                this.jQueryElement.off();
            }
        
            // Destroy any widget resources.
            if (this.stepchart) {
                this.stepchart.destroy();
            }
        });
    }
}