import {
  AfterViewInit,
  Component,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-swipe-action-demo',
  templateUrl: 'swipe-action.demo.html'
})
export class SwipeActionDemoComponent implements AfterViewInit {

  constructor(
    private element: ElementRef,
  ) { }

  ngAfterViewInit() {
    this.element.nativeElement.querySelector('#action-left-reveal').addEventListener('click', () => {
      this.element.nativeElement.querySelector('#output').textContent = 'Left Action (Reveal Mode) was chosen';
    });

    this.element.nativeElement.querySelector('#action-right-reveal').addEventListener('click', () => {
      this.element.nativeElement.querySelector('#output').textContent = 'Right Action (Reveal Mode) was chosen';
    });

    this.element.nativeElement.querySelector('#action-right-reveal-one').addEventListener('click', () => {
      this.element.nativeElement.querySelector('#output').textContent = 'Right Action (Reveal Mode) was chosen';
    });

    this.element.nativeElement.querySelector('#action-left-continuous').addEventListener('click', () => {
      this.element.nativeElement.querySelector('#output').textContent = 'Left Action (Continuous Mode) was chosen';
    });

    this.element.nativeElement.querySelector('#action-right-continuous').addEventListener('click', () => {
      this.element.nativeElement.querySelector('#output').textContent = 'Right Action (Continuous Mode) was chosen';
    });
  }
}
