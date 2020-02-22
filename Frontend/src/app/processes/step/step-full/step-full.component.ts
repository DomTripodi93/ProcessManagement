import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { StepService } from '../step.service';
import { Step } from '../step.model';

@Component({
  selector: 'app-step-full',
  templateUrl: './step-full.component.html',
  styleUrls: ['./step-full.component.css']
})
export class StepFullComponent implements OnInit {
  subscriptions: Subscription[] = [];
  step: Step;

  constructor(
    private stepServ: StepService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        this.stepServ.fetchSingleStep(params["department"], params["objective"], params["step"]).subscribe(step =>{
          this.step = step;
        })
      })
    ) 
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions
}
