import { EventEmitter } from '@angular/core';

/**
 * Static helper class for common test functionality
 */
export class TestHelper {
  /**
   * Fire a soho or dom event where it's expected to be re-emitted by the passed in event emitter
   *
   * @param element The native element where the dom event is triggered from.
   * @param eventName The name of the event to trigger on the native element.
   * @param eventEmitter The angular event emitter that will be checked toHaveBeenCalled 1 time.
   */
  public static testFireEvent(element: HTMLElement, eventName: string, eventEmitter: EventEmitter<any>) {
    const emitSpy = spyOn<any>(eventEmitter, 'emit');
    $(element).trigger(eventName);
    expect(emitSpy).toHaveBeenCalledTimes(1);
  }
}
