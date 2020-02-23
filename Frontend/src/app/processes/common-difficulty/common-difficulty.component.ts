import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/shared/helper.service';
import { AuthService } from 'src/app/shared/auth.service';
import { CommonDifficulty } from './common-difficulty.model';
import { CommonDifficultyService } from './common-difficulty.service';

@Component({
  selector: 'app-common-difficulty',
  templateUrl: './common-difficulty.component.html',
  styleUrls: ['./common-difficulty.component.css']
})
export class CommonDifficultyComponent implements OnInit, OnDestroy {
  @Input() department: string;
  @Input() objective: string;
  @Input() step: string;
  subscriptions: Subscription[] = [];
  commonDifficulties: CommonDifficulty[] = [];
  addMode: boolean = false;

  constructor(
    private commonDifficultyServ: CommonDifficultyService,
    private helper: HelperService,
    public authServ: AuthService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.commonDifficultyServ.commonDifficultyChanged.subscribe(()=>{
      this.commonDifficultyServ.commonDifficultyCancel.next();
      this.commonDifficulties = [];
      this.getCommonDifficulties();
    }));
    this.getCommonDifficulties();
  }

  getCommonDifficulties(){
    this.subscriptions.push(
      this.commonDifficultyServ.fetchCommonDifficultiesByStep(
        this.helper.slashToDash(this.department), 
        this.helper.slashToDash(this.objective),
        this.helper.slashToDash(this.step)
      ).subscribe(commonDifficulties =>{
        this.commonDifficulties = commonDifficulties;
      })
    );
  }
  //Gets all commonDifficulties for user

  addCommonDifficulty(){
    this.addMode = true;
    this.subscribeToCancel();
  }
  //Displays commonDifficulty form for adding new commonDifficulty

  subscribeToCancel(){
    this.subscriptions.push(this.commonDifficultyServ.commonDifficultyCancel.subscribe(()=>{
      this.addMode = false;
    }));
  }
  //subscribes to method of canceling add commonDifficulty form

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions

}