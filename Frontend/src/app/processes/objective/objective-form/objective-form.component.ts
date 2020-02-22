import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Objective } from '../objective.model';
import { ObjectiveService } from '../objective.service';
import { HelperService } from '../../../shared/helper.service';

@Component({
  selector: 'app-objective-form',
  templateUrl: './objective-form.component.html',
  styleUrls: ['./objective-form.component.css']
})
export class ObjectiveFormComponent implements OnInit {
  @Input() objectiveDefault: Objective;
  @Input() department: string;
  canInput= false;
  objectiveForm: FormGroup;
  isError = false;
  error = "";
  
  constructor(
    private objectiveServ: ObjectiveService,
    public auth: AuthService,
    private helpers: HelperService
  ){}
  
  ngOnInit(){
    this.canInput = this.auth.isAuthenticated;
    this.pickForm();
  }

  pickForm(){
    if (this.objectiveDefault){
      this.initForm(this.objectiveDefault)
    } else {
      let emptyObjective: Objective = {
        objectiveName: "",
        deptName: "",
        goal: "",
        time: 0
      };
      this.initForm(emptyObjective);
    }
  }
    
  private initForm(formObjective: Objective) {
    this.objectiveForm = new FormGroup({
      'objectiveName': new FormControl(formObjective.objectiveName, Validators.required),
      'deptName': new FormControl(this.department, Validators.required),
      'goal': new FormControl(formObjective.goal, Validators.required),
      'time': new FormControl(formObjective.time)
    });
  }


  async onSubmit(){
    if (this.objectiveDefault){
      this.updateObjective({
        goal: this.objectiveForm.value.goal,
        time: this.objectiveForm.value.time
      });
    } else {
      this.objectiveForm.value.objectiveName = await this.prepObjectiveName(this.objectiveForm.value.objectiveName);
      this.newObjective(this.objectiveForm.value);
    }
  }

  async prepObjectiveName(objectiveName: string){
    objectiveName = this.helpers.capitalize(objectiveName);
    objectiveName = this.helpers.slashToDash(objectiveName);
    objectiveName = await this.helpers.removeSpaceAtEnd(objectiveName);

    return objectiveName;
  }

  updateObjective(data: any) {
    this.objectiveServ.updateObjective(data, this.department, this.objectiveDefault.objectiveName).subscribe(()=>{
      this.objectiveServ.objectiveChanged.next();
    });
  }

  newObjective(data: Objective) {
    this.objectiveServ.addObjective(data).subscribe(()=>{
      this.objectiveServ.objectiveChanged.next();
    },
    () =>{
      this.isError = true;
      this.error = "That objective already exists for this department";
    });
  }

  onCancel(){
    this.objectiveServ.objectiveCancel.next();
  }

}
