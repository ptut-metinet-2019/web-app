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
  public isPaused = false;
  public isStoped = false;
  parentElement: LaunchPageComponent;

  constructor(@Inject(forwardRef(() => LaunchPageComponent)) private _parent: LaunchPageComponent,
              private router: Router) {
    this.parentElement = _parent;
  }

  ngOnInit(){

  }

  public pause(){
    this.parentElement.pause();
    this.isPaused = true;
  }

  public resume(){
    this.parentElement.resume();
    this.isPaused = false;
  }

  public stop(){
    this.parentElement.stop();
    this.isStoped = true;
  }

}
