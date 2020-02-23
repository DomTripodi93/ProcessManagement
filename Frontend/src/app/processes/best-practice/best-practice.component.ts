import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/shared/helper.service';
import { AuthService } from 'src/app/shared/auth.service';
import { BestPractice } from './best-practice.model';
import { BestPracticeService } from './best-practice.service';

@Component({
  selector: 'app-best-practice',
  templateUrl: './best-practice.component.html',
  styleUrls: ['./best-practice.component.css']
})
export class BestPracticeComponent implements OnInit, OnDestroy {
  @Input() department: string;
  @Input() objective: string;
  @Input() step: string;
  subscriptions: Subscription[] = [];
  bestPractices: BestPractice[] = [];
  addMode: boolean = false;

  constructor(
    private bestPracticeServ: BestPracticeService,
    private helper: HelperService,
    public authServ: AuthService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.bestPracticeServ.bestPracticeChanged.subscribe(()=>{
      this.bestPracticeServ.bestPracticeCancel.next();
      this.bestPractices = [];
      this.getBestPractices();
    }));
    this.getBestPractices();
  }

  getBestPractices(){
    this.subscriptions.push(
      this.bestPracticeServ.fetchBestPracticesByStep(
        this.helper.slashToDash(this.department), 
        this.helper.slashToDash(this.objective),
        this.helper.slashToDash(this.step)
      ).subscribe(bestPractices =>{
        this.bestPractices = bestPractices;
      })
    );
  }
  //Gets all bestPractices for user

  addBestPractice(){
    this.addMode = true;
    this.subscribeToCancel();
  }
  //Displays bestPractice form for adding new bestPractice

  subscribeToCancel(){
    this.subscriptions.push(this.bestPracticeServ.bestPracticeCancel.subscribe(()=>{
      this.addMode = false;
    }));
  }
  //subscribes to method of canceling add bestPractice form

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions

}