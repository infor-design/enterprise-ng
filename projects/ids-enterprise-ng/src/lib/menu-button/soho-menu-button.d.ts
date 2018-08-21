/**
 * Soho Menu Button.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery popupmenu control. See
 * soho-context-menu.d.ts for more information on options
 * for the popupmenu
 */

/**
 * Interface for the jQuery event emitted
 */
interface SohoMenuButtonEvent extends SohoPopupMenuEvent {

}

type AjaxBeforeOpenResponseFunction = (arg1: string) => void;
type AjaxBeforeOpenFunction = (
  response: AjaxBeforeOpenResponseFunction,
  options: any
) => void;
