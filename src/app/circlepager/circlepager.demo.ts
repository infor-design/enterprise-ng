import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-circlepager-demo',
  templateUrl: 'circlepager.demo.html',
  styleUrls: ['./circlepager.demo.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CirclepagerDemoComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {}
}
