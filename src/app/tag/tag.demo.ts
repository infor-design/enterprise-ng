import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tag-demo',
    templateUrl: 'tag.demo.html',
    standalone: false
})
export class TagDemoComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  afterRemove(e: any) {
    alert(`afterRemove ${e.tag.settings.content}`);
  }

  beforeRemove(e: any) {
    alert(`beforeRemove ${e.tag.settings.content}`);
  }

  beforeRemoveSolo(e: any) {
    alert(`beforeRemove (solo) ${e.tag.settings.content}`);
  }

  onClick(e: any) {
    alert(`Clicked`);
  }
}
