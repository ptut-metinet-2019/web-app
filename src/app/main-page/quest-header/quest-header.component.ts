import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {QuestListComponent} from "../quest-list/quest-list.component";
import {NavigationExtras, Router} from "@angular/router";
import {WebSocket} from "../../web-socket.service";
import {GlobalComponent} from "../../global.component";

@Component({
  selector: 'quest-header',
  templateUrl: './quest-header.component.html',
  styleUrls: ['./quest-header.component.scss']
})
export class QuestHeaderComponent implements OnInit{
  @Input("questionnaire") questionnaire: any;

  parentElement: QuestListComponent;

  constructor(@Inject(forwardRef(() => QuestListComponent)) private _parent: QuestListComponent,
              private router: Router, private webSocket: WebSocket, private globalComponent: GlobalComponent) {
    this.parentElement = _parent;
  }

  ngOnInit(){
    //console.info("questionnaire :",this.questionnaire);
    this.initLaunchEvents();
  }

  deleteQuestionnaire() {
    this.parentElement.deleteQuestionnaire(this.questionnaire);
  }

  onChange(){
    this.parentElement.updateQuestionnaire(this.questionnaire);
  }

  private goToLaunchPage(){
    this.webSocket.initLaunch(this.questionnaire.getId());
  }

  public stopLaunch(){
    this.webSocket.stopLaunch();
  }

  public initLaunchEvents(){
    this.webSocket.initSessionEvent(this.initLaunchCallback.bind(this), this.stopLaunchCallback.bind(this));
  }

  public initLaunchCallback(questionnaire: any, phoneNumber: string){
    console.info("initLaunchCallback()", questionnaire);
    if(questionnaire != undefined && phoneNumber != undefined){
      this.globalComponent.tmpLaunchQuestionnaire = questionnaire;
      this.globalComponent.phoneNumber = phoneNumber;
      this.router.navigate(['/launch/', questionnaire._id]);
    }else{
      window.alert("ERROR");
    }
  }

  public stopLaunchCallback(response: any){
    console.info("stopLaunchCallback()", response);
    this.router.navigate(['/dashboard']);
  }
}
