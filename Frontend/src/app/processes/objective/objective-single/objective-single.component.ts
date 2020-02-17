import { Component, OnInit, Input } from '@angular/core';
import { Objective } from '../objective.model';

@Component({
  selector: 'app-objective-single',
  templateUrl: './objective-single.component.html',
  styleUrls: ['./objective-single.component.css']
})
export class ObjectiveSingleComponent implements OnInit {
  @Input() Objective: Objective;

  constructor() { }

  ngOnInit() {
  }

}
