import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {StatPageComponent} from "../stat-page.component";
import {Router} from "@angular/router";

@Component({
  selector: 'quest-header-stat',
  templateUrl: './quest-header-stat.component.html',
  styleUrls: ['./quest-header-stat.component.scss']
})
export class QuestHeaderStatComponent implements OnInit{
  @Input("questionnaire") questionnaire: any;
  public parentElement: StatPageComponent;
  public selectedLancement: any;

  constructor(@Inject(forwardRef(() => StatPageComponent)) private _parent: StatPageComponent,
              private router: Router) {
    this.parentElement = _parent;
  }

  ngOnInit(){
    //console.info("questionnaire :",this.questionnaire);
  }
}
