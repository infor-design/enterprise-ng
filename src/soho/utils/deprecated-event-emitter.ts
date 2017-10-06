import {
  EventEmitter
} from '@angular/core';

export class DeprecatedEventEmitter<T> extends EventEmitter<T> {

  constructor(private deprecatedName: string, private newName: string) {
    super();
  }

  subscribe(...args) {
    console.warn(`"${this.deprecatedName}" event has been deprecated in favor of "${this.newName}" and will be removed in the next release.`);
  }

}
