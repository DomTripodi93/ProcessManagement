import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperService } from 'src/app/shared/helper.service';
import { AuthService } from 'src/app/shared/auth.service';
import { CommonDifficulty } from '../common-difficulty.model';
import { CommonDifficultyService } from '../common-difficulty.service';

@Component({
  selector: 'app-common-difficulty-form',
  templateUrl: './common-difficulty-form.component.html',
  styleUrls: ['./common-difficulty-form.component.css']
})
export class CommonDifficultyFormComponent implements OnInit {
  @Input() commonDifficultyDefault: CommonDifficulty;
  @Input() department: string;
  @Input() objective: string;
  @Input() step: string;
  canInput= false;
  commonDifficultyForm: FormGroup;
  isError = false;
  error = "";
  
  constructor(
    private commonDifficultyServ: CommonDifficultyService,
    private helpers: HelperService,
    public auth: AuthService
  ){}
  
  ngOnInit(){
    this.canInput = this.auth.isAuthenticated;
    this.pickForm();
  }

  pickForm(){
    if (this.commonDifficultyDefault){
      this.initForm(this.commonDifficultyDefault)
    } else {
      let emptyCommonDifficulty: CommonDifficulty = {
        stepNumber: this.step,
        deptName: this.department,
        objectiveName: this.objective,
        difficulty: "",
        cause: "",
        solution: ""
      };
      this.initForm(emptyCommonDifficulty);
    }
  }
  //Checks whether the form should be used for editing or creation of new model object
    
  private initForm(formCommonDifficulty: CommonDifficulty) {
    this.commonDifficultyForm = new FormGroup({
      'stepNumber': new FormControl(formCommonDifficulty.stepNumber, Validators.required),
      'deptName': new FormControl(formCommonDifficulty.deptName, Validators.required),
      'objectiveName': new FormControl(formCommonDifficulty.objectiveName, Validators.required),
      'difficulty': new FormControl(formCommonDifficulty.difficulty, Validators.required),
      'cause': new FormControl(formCommonDifficulty.cause, Validators.required),
      'solution': new FormControl(formCommonDifficulty.solution),
    });
  }


  async onSubmit(){
    if (this.commonDifficultyDefault){
      this.commonDifficultyForm.value.difficulty = await this.prepCommonDifficultyName(this.commonDifficultyForm.value.difficulty);
      this.updateCommonDifficulty(this.commonDifficultyForm.value);
    } else {
      this.commonDifficultyForm.value.difficulty = await this.prepCommonDifficultyName(this.commonDifficultyForm.value.difficulty);
      this.newCommonDifficulty(this.commonDifficultyForm.value);
    }
  }

  async prepCommonDifficultyName(difficulty: string){
    difficulty = this.helpers.capitalize(difficulty);
    difficulty = this.helpers.slashToDash(difficulty);
    difficulty = await this.helpers.removeSpaceAtEnd(difficulty);

    return difficulty;
  }

  updateCommonDifficulty(data: any) {
    this.commonDifficultyServ.updateCommonDifficulty(
      data, 
      this.commonDifficultyDefault.id
    ).subscribe(()=>{
      this.commonDifficultyServ.commonDifficultyChanged.next();
    });
  }

  newCommonDifficulty(data: CommonDifficulty) {
    this.commonDifficultyServ.addCommonDifficulty(data).subscribe(()=>{
      this.commonDifficultyServ.commonDifficultyChanged.next();
    },
    () =>{
      this.isError = true;
      this.error = "That common difficulty already exists for this objective";
    });
  }

  onCancel(){
    this.commonDifficultyServ.commonDifficultyCancel.next();
  }

}
