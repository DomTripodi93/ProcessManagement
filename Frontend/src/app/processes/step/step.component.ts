import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Step } from './step.model';
import { StepService } from './step.service';
import { AuthService } from 'src/app/shared/auth.service';
import { HelperService } from '../../shared/helper.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit, OnDestroy {
  @Input() department: string;
  @Input() objective: string;
  subscriptions: Subscription[] = [];
  steps: Step[] = [];
  addMode: boolean = false;

  constructor(
    private stepServ: StepService,
    private helper: HelperService,
    public authServ: AuthService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.stepServ.stepChanged.subscribe(()=>{
      this.stepServ.stepCancel.next();
      this.steps = [];
      this.getSteps();
    }));
    this.getSteps();
  }

  getSteps(){
    this.subscriptions.push(
      this.stepServ.fetchStepsByObjective(
        this.helper.slashToDash(this.department), 
        this.helper.slashToDash(this.objective)
      ).subscribe(steps =>{
        this.steps = steps;
      })
    );
  }
  //Gets all steps for user

  addStep(){
    this.addMode = true;
    this.subscribeToCancel();
  }
  //Displays step form for adding new step

  subscribeToCancel(){
    this.subscriptions.push(this.stepServ.stepCancel.subscribe(()=>{
      this.addMode = false;
    }));
  }
  //subscribes to method of canceling add step form

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions

}