import { utils } from '../utils/utils';
import Tag from './soho-tag';

// Component Name
const COMPONENT_NAME = 'taglist';

// Default Tag Options
const TAG_LIST_DEFAULTS = {
  tags: [],
};

/**
* Creates a collection of Tag Components and controls their rendering/value setting process.
* @class Tag
* @param {string} element The component element.
* @param {string} settings The component settings.
*/
export default class TagList {
  settings: any;

  element: HTMLElement;

  tags: Tag[];

  constructor(element: HTMLElement, settings: any) {
    this.settings = utils.mergeSettings(element, settings, TAG_LIST_DEFAULTS);
    this.element = element;

    this.tags = utils.getArrayFromList(this.element.querySelectorAll('.soho-tag'));
    if (this.tags.length) {
      this.settings.tags = [];
      this.tags.forEach((tag: any) => {
        this.settings.tags.push(new Tag(tag));
      });
    }

    this.init();
  }

  /**
   * @returns {number} representing the number of tags in the list.
   */
  get length() {
    return this.tags.length;
  }

  /**
   * @returns {array<HTMLElement>} containing a list of HTMLElement objects representing
   * the current list of tags.
   */
  get elements() {
    return this.tags.map((tag) => tag.element);
  }

  /**
   * Initialize the collection
   * @private
   * @returns {void}
   */
  init() {
    // Build tags list
    this.tags = [];
    if (Array.isArray(this.settings.tags)) {
      this.settings.tags.forEach((tag: Tag) => {
        this.add(tag);
      });
    }
    this.render();
  }

  /**
   * Given an object representation of a Tag, returns a string containing a key to use for
   * comparisons when checking if one Tag is equivalent to another
   * @private
   * @param {object} tagObj an object representation of a Tag
   * @returns {string} containing the name of the property to use.
   */
  getTargetProp(tagObj = {}) {
    const targetProps = ['id', 'href', 'content'];

    let targetProp = 'content';
    targetProps.forEach((prop) => {
      if (!targetProp && prop in tagObj) {
        targetProp = prop;
      }
    });

    return targetProp;
  }

  /**
   * Adds a new tag to the collection
   * @param {Tag|object} tagObj an incoming Tag Component instance, or object representing tag data.
   * @returns {Tag|array<Tag>} the newly formed tag object.
   */
  add(tagObj: any) {
    let tag: any;
    if (!tagObj) {
      throw new Error('No object was provided');
    }
    // Re-run this function on each item in an array
    if (Array.isArray(tagObj)) {
      const tags: any = [];
      tagObj.forEach((thisTagObj) => {
        tags.push(this.add(thisTagObj));
      });
      return tags;
    }

    if (!(tagObj instanceof Tag)) {
      tagObj.parent = this.element;
      tagObj.parentAPI = this;
      tag = new Tag(this.element, tagObj);
    } else {
      tag = tagObj;
      (tagObj as any).settings.parentAPI = this;
    }

    if (this.tags.indexOf(tag) === -1) {
      this.tags.push(tag);
    }

    return tag;
  }

  /**
   * Removes a tag from the collection.
   * @param {Tag|object} tagObj an incoming Tag Component instance, or object representing tag data.
   * @param {boolean} [doDestroy=false] if true, calls remove() and removes the tag from the DOM.
   * @returns {Tag|undefined} a reference to the removed tag
   */
  remove(tagObj: any, doDestroy: any) {
    if (tagObj instanceof Tag) {
      tagObj = (tagObj as any).settings;
    }

    // Figure out the property to use when checking for a match.
    const targetProp = this.getTargetProp(tagObj);

    // Filter out matching result(s) from the current tags array.
    let removedTag: any;
    const updatedTagsList = this.tags.filter((tag) => {
      const { settings } = tag;
      if (settings[targetProp] !== tagObj[targetProp]) {
        removedTag = tag;
        return false;
      }
      return true;
    });

    // Update the internal list of tags if we've removed one.
    if (updatedTagsList.length < this.tags.length) {
      this.tags = updatedTagsList;
    }

    // Destroy the tag, if applicable
    if (doDestroy) {
      removedTag.remove();
    }

    return removedTag;
  }

  /**
   * Removes all tags from this tag list.
   * @returns {void}
   */
  removeAll() {
    this.tags.forEach((tag) => {
      tag.remove();
    });
    this.tags = [];
  }

  /**
   * Renders all Tags contained by the internal tag list.
   * @returns {void}
   */
  render() {
    this.tags.forEach((tag) => {
      if ($(this.element).has(tag.element).length === 0) {
        $(this.element).append(tag.element);
        tag.init();
      } else {
        tag.render();
      }
    });
    this.element.classList[this.tags.length ? 'remove' : 'add']('empty');
  }

  /**
   * Focuses a tag in the taglist by referencing its Index within the `.tag-list` element.
   * @param {number} [tagIndex=0] the index of the tag within the tag list
   * @returns {HTMLElement} the element that will be focused
   */
  focusByIndex(tagIndex = 0) {
    const elems = this.elements;
    const min = 0;
    const max = elems.length;
    if (tagIndex < min) {
      tagIndex = min;
    }
    if (tagIndex > max) {
      tagIndex = max;
    }
    const targetElem = elems[tagIndex];
    const targetAnchor = targetElem.querySelector('a');
    if (targetAnchor) {
      targetAnchor.focus();
    }
    return targetElem;
  }

  /**
   * Focuses a tag in the taglist by referencing its Element.
   * @param {HTMLElement} element the element that will be focused
   * @returns {HTMLElement} the element that will be focused
   */
  focusPreviousElement(element: HTMLElement) {
    if (!(element instanceof HTMLElement)) {
      throw new Error(`${element} is not an HTMLElement`);
    }
    const index = this.elements.indexOf(element);
    const hasElem = index > -1;
    if (!hasElem) {
      throw new Error(`${element} does not exist within this TagList`);
    }
    return this.focusByIndex(index - 1);
  }

  /**
   * Updates the component with new settings
   * @param {object} [settings] if provided, updates the settings on this component instance
   * @returns {void}
   */
  updated(settings: any) {
    if (settings) {
      this.settings = utils.mergeSettings(this.element, settings, this.settings);
      if (Array.isArray(settings.tags)) {
        this.settings.tags = settings.tags;
      }
    }
    this.removeAll();
    this.init();
  }

  /**
   * Destroys this component instance
   * @returns {void}
   */
  destroy() {
    this.tags.forEach((tag) => {
      tag.remove();
    });
    this.tags = [];

    const $api = $(this.element).data(COMPONENT_NAME);
    if ($api) {
      $.removeData(this.element, COMPONENT_NAME);
    }
  }
}
