import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StepService } from '../step.service';
import { AuthService } from 'src/app/shared/auth.service';
import { HelperService } from 'src/app/shared/helper.service';

@Component({
  selector: 'app-step-form',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.css']
})
export class StepFormComponent implements OnInit {
  @Input() stepDefault: Step;
  @Input() department: string;
  @Input() objective: string;
  canInput= false;
  stepForm: FormGroup;
  isError = false;
  error = "";
  
  constructor(
    private stepServ: StepService,
    private helpers: HelperService,
    public auth: AuthService
  ){}
  
  ngOnInit(){
    this.canInput = this.auth.isAuthenticated;
    this.pickForm();
  }

  pickForm(){
    if (this.stepDefault){
      this.initForm(this.stepDefault)
    } else {
      let emptyStep: Step = {
        stepNumber: "",
        deptName: this.department,
        objectiveName: this.objective,
        name: "",
        goal: ""
      };
      this.initForm(emptyStep);
    }
  }
  //Checks whether the form should be used for editing or creation of new model object
    
  private initForm(formStep: Step) {
    this.stepForm = new FormGroup({
      'deptName': new FormControl(formStep.deptName, Validators.required),
      'objectiveName': new FormControl(formStep.objectiveName, Validators.required),
      'stepNumber': new FormControl(formStep.stepNumber, Validators.required),
      'name': new FormControl(formStep.name),
      'goal': new FormControl(formStep.goal, Validators.required),
    });
  }


  async onSubmit(){
    if (this.stepDefault){
      this.updateStep({
        name: this.stepForm.value.name,
        goal: this.stepForm.value.goal
      });
    } else {
      this.stepForm.value.stepNumber = await this.prepStepName(this.stepForm.value.stepNumber);
      this.newStep(this.stepForm.value);
    }
  }

  async prepStepName(stepNumber: string){
    stepNumber = this.helpers.capitalize(stepNumber);
    stepNumber = this.helpers.slashToDash(stepNumber);
    stepNumber = await this.helpers.removeSpaceAtEnd(stepNumber);

    return stepNumber;
  }

  updateStep(data: any) {
    this.stepServ.updateStep(
      data, 
      this.stepDefault.deptName, 
      this.stepDefault.objectiveName, 
      this.stepDefault.stepNumber
    ).subscribe(()=>{
      this.stepServ.stepChanged.next();
    });
  }

  newStep(data: Step) {
    this.stepServ.addStep(data).subscribe(()=>{
      this.stepServ.stepChanged.next();
    },
    () =>{
      this.isError = true;
      this.error = "That step already exists for this objective";
    });
  }

  onCancel(){
    this.stepServ.stepCancel.next();
  }

}
