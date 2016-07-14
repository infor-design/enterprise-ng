import {
  Component,
  AfterViewInit,
  HostBinding,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'soho-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements AfterViewInit {
  @HostBinding('class') get classes() {
    return 'header is-personalizable';
  }

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    // ngAfterViewInit lifecycle event - called after Angular creates the component's view(s).
    // meaning the content is in the DOM and it's ok to run jQuery against it

    let $toolbarElement: any = $('.toolbar');
    $toolbarElement.toolbar();

    let $applicationMenuElement: any = $('.application-menu');
    $applicationMenuElement.applicationmenu({triggers: [$('.application-menu-trigger')]});

    // let $element:any = jQuery(this.elementRef.nativeElement);
    // $('.toolbar', $element).toolbar();
    // $('.application-menu', $element).applicationmenu({triggers: [$('.application-menu-trigger')]});
  }
}
