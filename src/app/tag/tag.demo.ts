import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag-demo',
  templateUrl: 'tag.demo.html'
})
export class TagDemoComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  afterRemove(e: any) {
    alert(`afterRemove`);
  }

  beforeRemove(e: any) {
    alert(`beforeRemove`);
  }

  onClick(e: any) {
    alert(`Clicked`);
  }
}
