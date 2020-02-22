import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ObjectiveService } from './objective.service';
import { AuthService } from '../../shared/auth.service';
import { Objective } from './objective.model';
import { Subscription } from 'rxjs';
import { HelperService } from '../../shared/helper.service';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.css']
})
export class ObjectiveComponent implements OnInit, OnDestroy {
  @Input() department: string;
  subscriptions: Subscription[] = [];
  objectives: Objective[] = [];
  addMode: boolean = false;

  constructor(
    private objectiveServ: ObjectiveService,
    private helper: HelperService,
    public authServ: AuthService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.objectiveServ.objectiveChanged.subscribe(()=>{
      this.objectiveServ.objectiveCancel.next();
      this.objectives = [];
      this.getObjectives();
    }));
    this.getObjectives();
  }

  getObjectives(){
    this.subscriptions.push(
      this.objectiveServ.fetchObjectivesByDepartment(
        this.helper.slashToDash(this.department)
      ).subscribe(objectives =>{
        this.objectives = objectives;
      })
    );
  }
  //Gets all objectives for user

  addObjective(){
    this.addMode = true;
    this.subscribeToCancel();
  }
  //Displays objective form for adding new objective

  subscribeToCancel(){
    this.subscriptions.push(this.objectiveServ.objectiveCancel.subscribe(()=>{
      this.addMode = false;
    }));
  }
  //subscribes to method of canceling add objective form

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions

}

