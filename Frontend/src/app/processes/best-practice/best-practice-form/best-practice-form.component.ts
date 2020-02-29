import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperService } from 'src/app/shared/helper.service';
import { AuthService } from 'src/app/shared/auth.service';
import { BestPractice } from '../best-practice.model';
import { BestPracticeService } from '../best-practice.service';

@Component({
  selector: 'app-best-practice-form',
  templateUrl: './best-practice-form.component.html',
  styleUrls: ['./best-practice-form.component.css']
})
export class BestPracticeFormComponent implements OnInit {
  @Input() bestPracticeDefault: BestPractice;
  @Input() department: string;
  @Input() objective: string;
  @Input() step: string;
  canInput= false;
  bestPracticeForm: FormGroup;
  isError = false;
  error = "";
  
  constructor(
    private bestPracticeServ: BestPracticeService,
    private helpers: HelperService,
    public auth: AuthService
  ){}
  
  ngOnInit(){
    this.canInput = this.auth.isAuthenticated;
    this.pickForm();
  }

  pickForm(){
    if (this.bestPracticeDefault){
      this.initForm(this.bestPracticeDefault)
    } else {
      let emptyBestPractice: BestPractice = {
        practice: "",
        stepNumber: this.step,
        deptName: this.department,
        objectiveName: this.objective,
        method: "",
        purpose: ""
      };
      this.initForm(emptyBestPractice);
    }
  }
  //Checks whether the form should be used for editing or creation of new model object
    
  private initForm(formBestPractice: BestPractice) {
    this.bestPracticeForm = new FormGroup({
      'stepNumber': new FormControl(formBestPractice.stepNumber, Validators.required),
      'deptName': new FormControl(formBestPractice.deptName, Validators.required),
      'objectiveName': new FormControl(formBestPractice.objectiveName, Validators.required),
      'practice': new FormControl(formBestPractice.practice, Validators.required),
      'method': new FormControl(formBestPractice.method),
      'purpose': new FormControl(formBestPractice.purpose, Validators.required),
    });
  }


  async onSubmit(){
    if (this.bestPracticeDefault){
      this.bestPracticeForm.value.practice = await this.prepBestPracticeName(this.bestPracticeForm.value.practice);
      this.updateBestPractice(this.bestPracticeForm.value);
    } else {
      this.bestPracticeForm.value.practice = await this.prepBestPracticeName(this.bestPracticeForm.value.practice);
      this.newBestPractice(this.bestPracticeForm.value);
    }
  }

  async prepBestPracticeName(practice: string){
    practice = this.helpers.capitalize(practice);
    practice = this.helpers.slashToDash(practice);
    practice = await this.helpers.removeSpaceAtEnd(practice);

    return practice;
  }

  updateBestPractice(data: any) {
    this.bestPracticeServ.updateBestPractice(
      data, 
      this.bestPracticeDefault.id
    ).subscribe(()=>{
      this.bestPracticeServ.bestPracticeChanged.next();
    });
  }

  newBestPractice(data: BestPractice) {
    this.bestPracticeServ.addBestPractice(data).subscribe(()=>{
      this.bestPracticeServ.bestPracticeChanged.next();
    },
    () =>{
      this.isError = true;
      this.error = "That best practice already exists for this objective";
    });
  }

  onCancel(){
    this.bestPracticeServ.bestPracticeCancel.next();
  }

}