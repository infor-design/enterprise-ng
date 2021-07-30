interface SohoStepChartOptions {
    steps?: number;
    completed?: number;
    inProgress?: number;
    iconType?: boolean;
    completedText?: string;
    extraText?: string;
    completedColor?: string;
    allCompletedColor?: string;
    inProgressColor?: string;
    attributes?: Array<Object> | Object;
}

interface SohoStepChart {
    settings: SohoStepChartOptions;
    
    /** Updates the stepchart with any new settings and data */
    updated(settings?: SohoStepChartOptions): void;

    /** Destroys the control on completion. */
    destroy(): void;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
    stepchart(options?: SohoStepChartOptions): JQuery;
}