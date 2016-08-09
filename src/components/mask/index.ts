export * from './mask.component';

export interface MaskEvent {
    currentTarget: HTMLElement;
    data: any;
    delegateTarget: HTMLElement;
    handleObj: Object;
    isTrigger: number;
    namespace: string;
    result: any;
    rnamespace: any;
    target: HTMLElement;
    timeStamp: number;
    type: string;
}
