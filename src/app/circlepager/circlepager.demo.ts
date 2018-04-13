import {
  Component,
  OnInit,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'soho-circlepager.demo',
  templateUrl: './circlepager.demo.html',
  styleUrls: ['./circlepager.demo.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CirclepagerDemoComponent implements OnInit {

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {}
}
