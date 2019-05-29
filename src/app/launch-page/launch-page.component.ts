import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionListLaunchComponent} from "./question-list/question-list-launch.component";
import {WebSocket} from "../web-socket.service";
import {map} from "rxjs/operators";
import {GlobalComponent} from "../global.component";
import {QuestHeaderLaunchComponent} from "./quest-header/quest-header-launch.component";

@Component({
  selector: 'main-launch-page',
  templateUrl: './launch-page.component.html',
  styleUrls: ['./launch-page.component.scss']
})
export class LaunchPageComponent implements OnInit{
  @ViewChild("questionListPanel") questionListPanel: QuestionListLaunchComponent;
  @ViewChild("questHeader") questHeader: QuestHeaderLaunchComponent;
  private questId: number;
  public questionnaire: any;
  public questLoaded = false;

  constructor(private route: ActivatedRoute, private router: Router, private webSocket: WebSocket, private globalComponent: GlobalComponent) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.questionnaire = this.globalComponent.tmpLaunchQuestionnaire;
      console.info(this.questionnaire);
      this.questLoaded = true;
      //this.startLaunch();
    });
  }

  public pause(){
    this.questionListPanel.pause();
  }

  public resume(){
    this.questionListPanel.resume();
  }

  public stop(){
    this.questionListPanel.stop();
  }

  private startLaunch(){
    this.webSocket.startLaunch();
  }

  public stopLaunch(){
    this.webSocket.stopLaunch();
  }

  public startLaunchCallback(quest: any){
    console.info("startLaunchCallback()", quest);
  }

  public stopLaunchCallback(response: any){
    console.info("stopLaunchCallback()", response);
    if(response.status == 200 || response.status == 204){
      this.router.navigate(['/dashboard']);
    }else{
      window.alert(response.data.error);
    }
  }
}
