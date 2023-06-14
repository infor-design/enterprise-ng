import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-process-indicator',
  templateUrl: './process-indicator.demo.html'
})
export class ProcessIndicatorDemoComponent implements OnInit {

  processStates: any = [];
  userType = 'supplier';
  constructor() { }

  ngOnInit() {
    this.processStates = [
      {
        state: 'toBeStarted',
        name: this.userType === 'supplier' ? 'To be Started' : 'Awaiting',
        lastUpdated: '',
        activated: true,
        currentState: false,
      },
      {
        state: 'initiated',
        name: 'Initiated',
        lastUpdated: '',
        activated: true,
        currentState: false,
      },
      {
        state: 'submitted',
        name: this.userType === 'supplier' ? 'Submitted' : 'Received',
        lastUpdated: '',
        activated: true,
        currentState: false,
      },
      {
        state: 'underAssessment',
        name: this.userType === 'supplier' ? 'Under Assessment' : 'In Process',
        lastUpdated: 'Apr 5, 2023 1:57 PM',
        activated: true,
        currentState: false,
      },
      {
        state: 'assessmentCompleted',
        name: 'Assessment Completed',
        lastUpdated: '',
        activated: true,
        currentState: false,
      },
      {
        state: 'postAssessmentReview',
        name: 'Post Assessment Review',
        lastUpdated: '',
        activated: true,
        currentState: false,
      },
      {
        state: 'assessmentApproved',
        name: 'Assessment Approved',
        lastUpdated: 'Apr 5, 2023 1:57 PM',
        activated: true,
        currentState: true,
      },
      // {
      //   state: 'invoiceUnderReview',
      //   name: 'Invoice Under Review',
      //   lastUpdated: '',
      //   activated: false,
      //   currentState: false,
      // },
      // {
      //   state: 'invoiceApproved',
      //   name: 'Invoice Approved',
      //   lastUpdated: '',
      //   activated: false,
      //   currentState: false,
      // },
    ];

    this.updateColorsBasedOnStates();
  }

  updateColorsBasedOnStates() {
    if (this.processStates && this.processStates.length > 0) {
      const currentStateIndex = this.processStates.findIndex((ele: any) => {
        return ele.currentState;
      });
      if (
        currentStateIndex > -1 &&
        currentStateIndex <= this.processStates.length
      ) {
        for (let i = 0; i < this.processStates.length; i++) {
          if (i < currentStateIndex - 1) {
            this.processStates[i].titleClass = 'alert04-color';
          }
          if (i === currentStateIndex - 1) {
            this.processStates[i].titleClass = 'azure06-color';
          }
          if (i === currentStateIndex) {
            this.processStates[i].titleClass = 'azure07-color';
          }
        }
      }
    }
  }

  onClickOnNext() {
    if (this.processStates && this.processStates.length > 0) {
      const currentStateIndex = this.processStates.findIndex((ele: any) => {
        return ele.currentState;
      });

      if (
        currentStateIndex > -1 &&
        currentStateIndex <= this.processStates.length
      ) {
        this.processStates[currentStateIndex].currentState = false;
        this.processStates[currentStateIndex + 1].currentState = true;
        this.processStates[currentStateIndex + 1].activated = true;
      }
    }
    this.updateColorsBasedOnStates();
  }
}