# SoHoXi Angular Component : File Upload Advanced

## Description

This component provides access from Angular to the SoHoXi `fileuploadadvanced` JQuery control.

File Upload Advanced allow users to drag and drop multiple files for uploading.

### Usage

To add a `fileuploadadvanced` to a component requires adding the module `SohoFileUploadAdvancedModule` into the hosting component.
If you have included the top level SoHo module them this will be included already.

In the markup for the hosting component add:

```html
<soho-fileupload-advanced>
</soho-fileupload-advanced>
```

or

```html
<div soho-fileupload-advanced></div>
```

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `disabled` | Boolean | The disabled state of the control, either true or false. |
| `isStandalone` | Boolean | Used for some visual styling depending on the container, On page(true) -or- on modal (false) |
| `allowedTypes` | String | Restrict file types(ie. 'jpg|png|gif') ['*' all types] |
| `send` | Function | Callback, invoked when a file(s) are selected, see below. |
| `maxFilesInProcess` | Number | Max number of files that can be uploaded. |
| `maxFileSize` | Number | Max file size in bytes, -1 for unlimited |
| `fileName` | String | Variable name to read from server |
| `isDisabled` | Boolean | Make control disabled |
| `showBrowseButton` | Boolean| Add way to browse files to upload |
| `textDropArea` | String | Text to show in drop area |
| `textDropAreaWithBrowse` | String | Text to show in drop area when browse option true |
| `textBtnCancel` | String | Hidden text for cancel button |
| `textBtnCloseError` | String | Hidden text for error close button |
| `textBtnRemove` | String | Hidden text for remove button |

## Callbacks

The `send` method takes:

- `formData` - of type `FormData` which contains the file stream data.
- `status` - callback - access to the `statusbar` used by the upload operation

## Methods

| Name | Description |
| --- | --- |
| `destroy` | Destroys the control and any markup / events associated with it. |

## Events

| Name | Description |
| --- | --- |
| `filesdragenter`| Fired when dragged file(s)enter the control, passing the File. |
| `filesdropped` | Fired when dragged file(s) are dropped, passing the File. |
| `beforecreatestatus` | Fired before the status bar is created, passing the File. |
| `aftercreatestatus` | Fired after the status bar is created, passing the File. |
| `fileprogress` | Fired as the file is uploaded, passing the File. |
| `fileaborted` | Fired if the upload was aborted, passing the File. |
| `filecompleteduploading` | Fired when the upload completes, passing the File. |

## Examples

### Simple File Upload Advanced Component

This example shows a simple `fileuploadadvanced` component

```html
 <soho-fileupload-advanced (filesdragenter)="onFilesdragenter()"></soho-fileupload-advanced>
```
