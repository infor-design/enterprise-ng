import { Component } from '@angular/core';

import {SohoModalDialogRef} from '../../components/dialog/modal-dialog.ref';

@Component({
  selector: 'demo-dialog',
  template: `<div id="modal-add-context" style="display: none;">
     <div class="field">
        <label for="context-type">Type</label>
        <select class="dropdown-lg" id="context-type" name="context-type">
          <option value="1">Context 01</option>
          <option value="2">Context 02</option>
          <option value="3">Context 03</option>
          <option value="4">Context 04</option>
          <option value="5">Context 05</option>
        </select>
      </div>

      <div class="field">
        <label for="context-name">Name</label>
        <input id="context-name" name="context-name" class="input-lg" type="text" placeholder="Example: Name01">
      </div>

      <div class="field">
       <label for="context-desc">Description</label>
       <textarea id="context-desc" name="context-desc" class="textarea-lg" placeholder="Example: A description goes here."></textarea>
      </div>
    </div>`
})
export class DemoDialogComponent {
  constructor(public dialogRef: SohoModalDialogRef<DemoDialogComponent>) {}

}
