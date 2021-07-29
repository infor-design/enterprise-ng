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

    @Input() set steps(steps: number) {
        this.options.steps = steps;
        if (this.stepchart) {
            this.stepchart.settings.steps = steps;
            this.updateRequired = true;
        }
    }

    @Input() set completed(completed: number) {
        this.options.completed = completed;
        if (this.stepchart) {
            this.stepchart.settings.completed = completed;
            this.updateRequired = true;
        }
    }

    @Input() set inProgress(inProgress: number) {
        this.options.inProgress = inProgress;
        if (this.stepchart) {
            this.stepchart.settings.inProgress = inProgress;
            this.updateRequired = true;
        }
    }

    @Input() set iconType(iconType: boolean) {
        this.options.iconType = iconType;
        if (this.stepchart) {
            this.stepchart.settings.iconType = iconType;
            this.updateRequired = true;
        }
    }

    @Input() set completedText(completedText: string) {
        this.options.completedText = completedText;
        if (this.stepchart) {
            this.stepchart.settings.completedText = completedText;
            this.updateRequired = true;
        }
    }

    @Input() set extraText(extraText: string) {
        this.options.extraText = extraText;
        if (this.stepchart) {
            this.stepchart.settings.extraText = extraText;
            this.updateRequired = true;
        }
    }

    @Input() set completedColor(completedColor: string) {
        this.options.completedColor = completedColor;
        if (this.stepchart) {
            this.stepchart.settings.completedColor = completedColor;
            this.updateRequired = true;
        }
    }

    @Input() set allCompletedColor(allCompletedColor: string) {
        this.options.allCompletedColor = allCompletedColor;
        if (this.stepchart) {
            this.stepchart.settings.allCompletedColor = allCompletedColor;
            this.updateRequired = true;
        }
    }

    @Input() set inProgressColor(inProgressColor: string) {
        this.options.inProgressColor = inProgressColor;
        if (this.stepchart) {
            this.stepchart.settings.inProgressColor = inProgressColor;
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
            }

            // Destroy any widget resources.
            if (this.stepchart) {
                // Error occurs in teardown
                // this.stepchart.destroy();
                this.stepchart = null;
            }
        });
    }
}