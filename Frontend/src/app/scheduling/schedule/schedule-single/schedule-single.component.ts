import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from '../schedule.model';
import { HelperService } from 'src/app/shared/helper.service';

@Component({
  selector: 'app-schedule-single',
  templateUrl: './schedule-single.component.html',
  styleUrls: ['./schedule-single.component.css']
})
export class ScheduleSingleComponent implements OnInit {
  @Input() schedule: Schedule;
  @Input() oneEmployee: boolean;
  time: string;

  constructor(
    private helpers: HelperService
  ) { }

  ngOnInit() {
    this.setTime();
  }

  setTime(){
    this.time = this.helpers.timeFromDate(this.schedule.date);
  }
}
