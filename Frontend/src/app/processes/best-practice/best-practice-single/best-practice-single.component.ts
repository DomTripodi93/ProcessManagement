import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/shared/helper.service';
import { BestPractice } from '../best-practice.model';
import { BestPracticeService } from '../best-practice.service';

@Component({
  selector: 'app-best-practice-single',
  templateUrl: './best-practice-single.component.html',
  styleUrls: ['./best-practice-single.component.css']
})
export class BestPracticeSingleComponent implements OnInit, OnDestroy {
  @Input() bestPractice: BestPractice;
  @Input() inStep: boolean;
  subscriptions: Subscription[] = [];
  editMode: boolean = false;

  constructor(
    private bestPracticeServ: BestPracticeService,
    private helpers: HelperService
  ) { }

  ngOnInit() {
    this.bestPractice.practice = this.helpers.dashToSlash(this.bestPractice.practice);
    this.subscriptions.push(this.bestPracticeServ.bestPracticeCancel.subscribe(()=>{
      this.editMode = false;
    }));
  }

  editBestPractice(){
    this.editMode = true;
  }
  //Shows edit form for selected BestPractice

  onDelete(){
    if (confirm(
      "Are you sure you want to delete the " +this.bestPractice.practice+ " bestPractice?"
      )){
      this.bestPracticeServ.deleteBestPractice(this.bestPractice.id).subscribe(()=>{
        this.bestPracticeServ.bestPracticeChanged.next();
      });
    }
  }
  //Deletes selected BestPractice

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions
}
