import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Objective } from '../objective.model';
import { ObjectiveService } from '../objective.service';
import { Subscription } from 'rxjs';
import { HelperService } from '../../../shared/helper.service';

@Component({
  selector: 'app-objective-single',
  templateUrl: './objective-single.component.html',
  styleUrls: ['./objective-single.component.css']
})
export class ObjectiveSingleComponent implements OnInit, OnDestroy {
  @Input() objective: Objective;
  @Input() inDepartment: boolean;
  subscriptions: Subscription[] = [];
  editMode: boolean = false;

  constructor(
    private objectiveServ: ObjectiveService,
    private helpers: HelperService
  ) { }

  ngOnInit() {
    this.objective.objectiveName = this.helpers.dashToSlash(this.objective.objectiveName);
    this.subscriptions.push(this.objectiveServ.objectiveCancel.subscribe(()=>{
      this.editMode = false;
    }));
  }

  editObjective(){
    this.editMode = true;
  }
  //Shows edit form for selected Objective

  onDelete(){
    if (confirm(
      "Are you sure you want to delete the " +this.objective.objectiveName+ " objective?"
      )){
      this.objectiveServ.deleteObjective(
        this.objective.deptName, this.objective.objectiveName
      ).subscribe(()=>{
        this.objectiveServ.objectiveChanged.next();
      });
    }
  }
  //Deletes selected Objective

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions
}
