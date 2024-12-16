import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs-resize.demo.html',
    styleUrls: ['./tabs-resize.demo.css'],
    standalone: false
})
export class TabsResizeDemoComponent {

  @HostListener('window:resize') resized() {
    console.log(`Window resized. Width:${window.innerWidth}, Height:${window.innerHeight}`);
  }

  triggerResize() {
    window.dispatchEvent(new Event('resize'));
  }
}
