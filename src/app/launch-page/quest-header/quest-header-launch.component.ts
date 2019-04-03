import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {LaunchPageComponent} from "../launch-page.component";
import {Router} from "@angular/router";

@Component({
  selector: 'quest-header-launch',
  templateUrl: './quest-header-launch.component.html',
  styleUrls: ['./quest-header-launch.component.scss']
})
export class QuestHeaderLaunchComponent implements OnInit{
  @Input("questionnaire") questionnaire: any;

  parentElement: LaunchPageComponent;

  constructor(@Inject(forwardRef(() => LaunchPageComponent)) private _parent: LaunchPageComponent,
              private router: Router) {
    this.parentElement = _parent;
  }

  ngOnInit(){

  }

}
