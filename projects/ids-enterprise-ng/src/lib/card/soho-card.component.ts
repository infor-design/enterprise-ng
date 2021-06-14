import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';

// tslin:disable-next-line:no-unused-variable
import { Observable } from 'rxjs';

@Component({
  selector: 'soho-card-header',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoCardHeaderComponent {
  @HostBinding('class.card-header') get isCardHeader() { return true; }
  @HostBinding('style.display') block = 'block';
}

@Component({
  selector: 'soho-card-pane',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoCardPaneComponent { }

@Component({
  selector: 'soho-card', // eslint-disable-line
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoCardComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.card') get isCard() { return true; }
  @HostBinding('style.display') block = 'block';

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }
}
