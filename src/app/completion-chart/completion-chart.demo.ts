import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-completion-chart-demo',
  templateUrl: 'completion-chart.demo.html'
})

export class CompletionChartDemoComponent implements OnInit, OnDestroy {

  private _completionData: SohoDataSet | undefined = undefined;
  private _completionTargetData?: SohoDataSet = undefined;
  private _targetedAchievementData?: SohoDataSet = undefined;

  constructor() {
  }

  ngOnInit() {
    this.buildCompletionData();
    this.buildCompletionTargetData();
    this.buildTargetedAchievementData();
  }

  ngOnDestroy() {
  }

  // public getters
  get completionData() {
    return this._completionData;
  }

  get completionTargetData() {
    return this._completionTargetData;
  }

  get targetedAchievementData() {
    return this._targetedAchievementData;
  }

  private buildCompletionData() {
    const chartData: SohoChartData = {
      name:      {
        text: 'Current Status'
      },
      info:      {
        value: '13 %'
      },
      completed: {
        value: 13,
        color: 'error'
      }
    };

    const chartDataSetItem: SohoDataSetItem = {
      data: [ chartData ]
    };

    this._completionData = [ chartDataSetItem ];
  }

  private buildCompletionTargetData() {
    const chartData: SohoChartData = {
      name:      {
        text: 'Travel Percent'
      },
      completed: {
        value: 33,
        color: 'primary'
      },
      total:     {
        value: 100
      }
    };

    const chartDataSetItem: SohoDataSetItem = {
      data: [ chartData ]
    };

    this._completionTargetData = [ chartDataSetItem ];
  }

  private buildTargetedAchievementData() {
    const chartData: SohoChartData = {
      name:      {
        text: 'Customer Satisfaction'
      },
      info:      {
        value: 78
      },
      completed: {
        value: 78,
        color: 'good'
      },
      percentText: {
        show: true
      }
    };

    const chartDataSetItem: SohoDataSetItem = {
      data: [ chartData ]
    };

    this._targetedAchievementData = [ chartDataSetItem ];
  }
}
