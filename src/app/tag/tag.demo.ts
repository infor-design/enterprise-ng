import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'soho-tag-demo',
  templateUrl: './tag.demo.html'
})
export class TagDemoComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  afterRemove(e) {
    alert(`Removed ${JSON.stringify(e)}`);
  }

  onClick(e) {
    alert(`Clicked ${JSON.stringify(e)}`);
  }
}
