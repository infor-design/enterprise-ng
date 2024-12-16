import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'application-menu-demo', // eslint-disable-line
    templateUrl: 'application-menu.demo.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ApplicationMenuDemoComponent {
}
