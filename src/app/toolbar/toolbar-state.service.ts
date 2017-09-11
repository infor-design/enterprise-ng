import { Injectable } from '@angular/core';

@Injectable()
export class ToolbarStateService {
  public  buildToolbarButtonSet1(): Array<LMToolbarButton> {
    const toolbarButtonSet = [];

    toolbarButtonSet.push({
      id    : 'Create',
      button: 'icon',
      data  : '{"btn" : "create"}',
      text  : 'Create',
      icon  : 'add',
      state : {
        disabled: false,
        visible: true
      }
    });

    toolbarButtonSet.push({
      id       : 'charts-btn',
      data     : '{"btn" : "charts"}',
      icon     : 'pie-chart',
      menu     : [
        {text: 'Pie Chart',    data: '{\'menu\': \'pie\'}'},
        {text: 'Line Chart',   data: '{\'menu\': \'line\'}'},
        {text: 'Bubble Chart', data: '{\'menu\': \'bubble\'}'}
      ],
      state : {
        disabled: false,
        visible: true
      }
    });

    toolbarButtonSet.push({
      data     : '{"btn" : "open"}',
      text     : 'Open',
      icon     : 'folder',
      state : {
        disabled: false,
        visible: true
      }
    });

    toolbarButtonSet.push({
      data     : '{"btn" : "delete"}',
      text     : 'Delete',
      icon     : 'delete',
      state : {
        disabled: true,
        visible: true
      }
    });

    toolbarButtonSet.push({
      data     : '{"btn" : "refresh"}',
      text     : 'Refresh',
      icon     : 'refresh',
      state : {
        disabled: false,
        visible: true
      }
    });

    return toolbarButtonSet;
  }

  public buildToolbarButtonSet2(): Array<LMToolbarButton> {
    const toolbarButtonSet = [];

    toolbarButtonSet.push({
      data : '{"btn" : "create"}',
      text : 'Create',
      state : {
        disabled: false,
        visible: true
      }
    });

    toolbarButtonSet.push({
      data : '{"btn" : "open"}',
      text : 'Open',
      state : {
        disabled: false,
        visible: false
      }
    });

    toolbarButtonSet.push({
      data : '{"btn" : "delete"}',
      text : 'Delete',
      state : {
        disabled: true,
        visible: true
      }
    });

    toolbarButtonSet.push({
      data : '{"btn" : "refresh"}',
      text : 'Refresh',
      state : {
        disabled: false,
        visible: true
      }
    });

    return toolbarButtonSet;
  }

  public buildToolbarButtonSet3(): Array<LMToolbarButton> {
    const toolbarButtonSet = [];

    toolbarButtonSet.push({
      data     : '{"btn" : "create"}',
      text     : 'Create',
      icon     : 'add',
      state : {
        disabled: false,
        visible: true
      }
    });

    toolbarButtonSet.push({
      data     : '{"btn" : "open"}',
      text     : 'Open',
      icon     : 'folder',
      state : {
        disabled: false,
        visible: true
      }
    });

    toolbarButtonSet.push({
      data     : '{"btn" : "delete"}',
      text     : 'Delete',
      icon     : 'delete',
      state : {
        disabled: false,
        visible: true
      }
    });

    toolbarButtonSet.push({
      data     : '{"btn" : "refresh"}',
      text     : 'Refresh',
      icon     : 'refresh',
      state : {
        disabled: true,
        visible: true
      }
    });

    return toolbarButtonSet;
  }
}

export interface LMToolbarButton {
  text     ?: string;
  icon     ?: string;
  data     ?: string;
  menu     ?: any;
  state    ?: LMToolbarButtonState;
}

export interface LMToolbarButtonState {
  disabled: boolean;
  visible: boolean;
}
