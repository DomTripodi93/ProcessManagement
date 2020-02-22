import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Step } from '../step.model';
import { Subscription } from 'rxjs';
import { StepService } from '../step.service';
import { HelperService } from 'src/app/shared/helper.service';

@Component({
  selector: 'app-step-single',
  templateUrl: './step-single.component.html',
  styleUrls: ['./step-single.component.css']
})
export class StepSingleComponent implements OnInit, OnDestroy {
  @Input() step: Step;
  @Input() inObjective: boolean;
  subscriptions: Subscription[] = [];
  editMode: boolean = false;

  constructor(
    private stepServ: StepService,
    private helpers: HelperService
  ) { }

  ngOnInit() {
    this.step.stepNumber = this.helpers.dashToSlash(this.step.stepNumber);
    this.subscriptions.push(this.stepServ.stepCancel.subscribe(()=>{
      this.editMode = false;
    }));
  }

  editStep(){
    this.editMode = true;
  }
  //Shows edit form for selected Step

  onDelete(){
    if (confirm(
      "Are you sure you want to delete the " +this.step.stepNumber+ " step?"
      )){
      this.stepServ.deleteStep(
        this.step.deptName, this.step.objectiveName, this.step.stepNumber
      ).subscribe(()=>{
        this.stepServ.stepChanged.next();
      });
    }
  }
  //Deletes selected Step

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions
}
