import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HelperService } from 'src/app/shared/helper.service';
import { Subscription } from 'rxjs';
import { CommonDifficulty } from '../common-difficulty.model';
import { CommonDifficultyService } from '../common-difficulty.service';

@Component({
  selector: 'app-common-difficulty-single',
  templateUrl: './common-difficulty-single.component.html',
  styleUrls: ['./common-difficulty-single.component.css']
})
export class CommonDifficultySingleComponent implements OnInit, OnDestroy {
  @Input() commonDifficulty: CommonDifficulty;
  @Input() inStep: boolean;
  subscriptions: Subscription[] = [];
  editMode: boolean = false;

  constructor(
    private commonDifficultyServ: CommonDifficultyService,
    private helpers: HelperService
  ) { }

  ngOnInit() {
    this.commonDifficulty.difficulty = this.helpers.dashToSlash(this.commonDifficulty.difficulty);
    this.subscriptions.push(this.commonDifficultyServ.commonDifficultyCancel.subscribe(()=>{
      this.editMode = false;
    }));
  }

  editCommonDifficulty(){
    this.editMode = true;
  }
  //Shows edit form for selected CommonDifficulty

  onDelete(){
    if (confirm(
      "Are you sure you want to delete the " +this.commonDifficulty.difficulty+ " commonDifficulty?"
      )){
      this.commonDifficultyServ.deleteCommonDifficulty(this.commonDifficulty.id).subscribe(()=>{
        this.commonDifficultyServ.commonDifficultyChanged.next();
      });
    }
  }
  //Deletes selected CommonDifficulty

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions
}
