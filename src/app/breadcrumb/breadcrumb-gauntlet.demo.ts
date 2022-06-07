import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
// @ts-ignore
import { SohoBreadcrumbComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-breadcrumb-gauntlet-demo',
  templateUrl: 'breadcrumb-gauntlet.demo.html',
  styles: [
    '#results-card { padding: 20px; }',
    '#results-card .prop { display: inline-block; font-weight: 700; min-width: 150px; }'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbGauntletDemoComponent {

  @ViewChild(SohoBreadcrumbComponent, { static: true }) breadcrumb?: SohoBreadcrumbComponent;

  public breadcrumbIdCount = 0;
  public demoForm: UntypedFormGroup;

  public lastClickedAPI?: SohoBreadcrumbItemStatic;
  public lastClickedContents: string | undefined = '';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private ref: ChangeDetectorRef
  ) {
    this.demoForm = this.formBuilder.group({
      id: [''],
      autoGenerateId: [true],
      content: ['', Validators.required],
      autoGenerateContent: [true],
      href: [''],
      disabled: [false],
      current: [false],
      callback: [true]
    });
    this.demoForm.controls.id.disable();
    this.demoForm.controls.content.disable();

    // Disable/Enable the ID form field if its contents should/shouldn't be auto generated.
    this.demoForm
      .controls['autoGenerateId']
      .valueChanges
      .subscribe((val) => {
          this.demoForm.controls['id'][val === true ? 'disable' : 'enable']();
      });

    // Disable/Enable the Content form field if its contents should/shouldn't be auto generated.
    this.demoForm
      .controls['autoGenerateContent']
      .valueChanges
      .subscribe((val) => {
          this.demoForm.controls['content'][val === true ? 'disable' : 'enable']();
      });
  }

  add() {
    let increaseCount = false;
    const newSettings: SohoBreadcrumbItemOptions = {
      content: ''
    };

    // Content (Required)
    const formContent = this.demoForm.controls['content'].value;
    const autoGenerateContent = this.demoForm.controls['autoGenerateContent'].value;
    if (autoGenerateContent) {
      newSettings.content = `New Breadcrumb ${this.breadcrumbIdCount}`;
      increaseCount = true;
    } else if (formContent && formContent.length) {
      newSettings.content = formContent;
    }

    // Set an ID
    const formId = this.demoForm.controls['id'].value;
    const autoGenerateId = this.demoForm.controls['autoGenerateId'].value;
    if (autoGenerateId) {
      newSettings.id = `breadcrumb-${this.breadcrumbIdCount}`;
      increaseCount = true;
    } else if (formId && formId.length) {
      newSettings.id = formId;
    }

    // `href` attribute on the anchor
    const formHref = this.demoForm.controls['href'].value;
    if (formHref && formHref.length) {
      newSettings.href = formHref;
    }

    // Disabled?
    newSettings.disabled = this.demoForm.controls['disabled'].value;

    // Currently Active?
    newSettings.current = this.demoForm.controls['current'].value;

    // Fire a callback when the anchor is clicked.
    // The callback function runs in the context of the IDS Breadcrumb Item's API.
    const self = this;
    if (this.demoForm.controls['callback'].value) {
      newSettings.callback = function testCallback (e) {
        // @ts-ignore
        self.renderBreadcrumbConfig(e.currentTarget);
        const content = (e.currentTarget).text();

        // Trigger a toast message
        $('body').toast({
          title: '"' + content + '" Clicked',
          message: 'The Breadcrumb "' + content + '" was clicked, and its callback was fired.'
        });

        // Automatically disable "linking out" from breadcrumb links on this test.
        // Normal behavior will allow the links to be followed as expected.
        if (e.target.href === '#' || e.target.href === '') {
          e.preventDefault();
          return false;
        }

        return true;
      };
    }

    this.breadcrumb?.add(newSettings, true);

    if (increaseCount) {
      this.breadcrumbIdCount++;
    }
  }

  public reset() {
    this.demoForm.reset();
  }

  renderBreadcrumbConfig(item: SohoBreadcrumbRef) {
    const target = this.breadcrumb?.getBreadcrumbItem(item);
    const api = (target as any).api;
    if (!api || !api.settings) {
      return;
    }

    // Renders the return message
    const msg = '<p>' +
      '<span class="prop">ID:</span> ' + ('"' + api.settings.id + '"' || 'undefined') + '<br />' +
      '<span class="prop">Content:</span> "' + api.settings.content + '" <br />' +
      '<span class="prop">Callback Enabled:</span> ' + (typeof api.settings.callback === 'function') + '<br />' +
      '<span class="prop">Currently Active:</span> ' + api.settings.current + '<br />' +
      '<span class="prop">Disabled:</span> ' + (api.disabled || 'false') + '<br />' +
      '<span class="prop">href:</span> ' + ('"' + api.settings.href + '"' || 'undefined') + '<br />' +
      '</p>';

    this.lastClickedContents = msg;
    this.lastClickedAPI = api;
    this.ref.markForCheck();
  }

  removeAll(): void {
    this.breadcrumb?.removeAll();

    this.lastClickedContents = undefined;
    this.lastClickedAPI = undefined;
    this.ref.markForCheck();
  }

  removeLastClicked(): void {
    if (!this.lastClickedAPI) {
      return;
    }
    this.breadcrumb?.remove(this.lastClickedAPI);

    this.lastClickedContents = undefined;
    this.lastClickedAPI = undefined;
    this.ref.markForCheck();
  }

  setCurrent(): void {
    if (!this.lastClickedAPI) {
      return;
    }
    this.breadcrumb?.makeCurrent(this.lastClickedAPI);
    this.renderBreadcrumbConfig(this.lastClickedAPI);
  }
}
