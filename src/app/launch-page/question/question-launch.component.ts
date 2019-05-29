import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {QuestionListLaunchComponent} from "../question-list/question-list-launch.component";
import {GlobalComponent} from "../../global.component";
import {WebSocket} from "../../web-socket.service";

@Component({
  selector: 'question-launch',
  templateUrl: './question-launch.component.html',
  styleUrls: ['./question-launch.component.scss']
})
export class QuestionLaunchComponent implements OnInit{
  @Input("question") question: any;
  parentElement: QuestionListLaunchComponent;
  public cpt: any;
  public timerValue: any;
  public isPaused = false;
  public isStoped = false;
  public timer: any;
  public phoneNumber: string;
  public nbAnswerReceived: number = 0;

  constructor(@Inject(forwardRef(() => QuestionListLaunchComponent)) private _parent:QuestionListLaunchComponent, private globalComponent: GlobalComponent, private webSocket: WebSocket) {
    this.parentElement = _parent;
    this.phoneNumber = this.globalComponent.phoneNumber;
  }

  ngOnInit(){
    this.isStoped = false;
    this.isPaused = false;
    this.initSessionEvents();
    this.startQuestion();
  }

  public initSessionEvents(){
    this.webSocket.initSessionEvent2(this.startQuestionCallback.bind(this), this.endQuestionCallback.bind(this), this.stopCallback.bind(this), this.answerReceivedCallback.bind(this));
  }

  public startQuestion(){
    let that = this;
    setTimeout(function()
    {
      that.webSocket.startLaunch();
    }, 2000);
  }

  public loadTimer(){
    if(this.question.timer != undefined && this.question.timer != 0){
      this.cpt = this.question.timer;
      this.timerValue = parseInt(this.question.timer);
    }else{
      this.cpt = this.parentElement.questionnaire.timer;
      this.timerValue = parseInt(this.parentElement.questionnaire.timer);
    }
    console.info("timer value = '" + this.timerValue + "'");
    let cptMax = parseInt(this.cpt)+1;
    //for(let i = 1; i < cptMax; i++){
      this.timer = setInterval(function(){
        if(!this.isPaused && !this.isStoped && this.timerValue > 0){
          this.timerValue -= 1;
        }else{
          cptMax += 1;
        }
      }.bind(this),1000);
    //}
  }

  public pause(){
    this.isPaused = true;
  }

  public resume(){
    this.isPaused = false;
  }

  public stop(){
    this.webSocket.stopLaunch();
  }

  public goNextQuestion(){
    clearInterval(this.timer);
    this.parentElement.goNextQuestion();
    this.webSocket.nextLaunch();
  }

  public startQuestionCallback(param){
    console.info("startQuestionCallback()", param, this.question);
    this.nbAnswerReceived = 0;
    this.loadTimer();
  }

  public endQuestionCallback(){
    console.info("endQuestionCallback()");
  }

  public stopCallback(){
    this.isPaused = true;
    this.isStoped = true;
    clearInterval(this.timer);
    this.timerValue = "Questionnaire terminé";
    this._parent.parentElement.questHeader.isStoped = true;
  }

  public answerReceivedCallback(answer, choiceId){
    console.info("answerReceivedCallback()",answer, choiceId);
    this.nbAnswerReceived++;
    if(this.question.answers == undefined){
      this.question.answers = [];
    }
    if(this.question.type == "free"){
      this.question.answers.push({answer: answer, choiceId: choiceId});
    }else{
      let label = this.foundLabelOfChoice(choiceId);
      this.question.answers.push({answer: label, choiceId: choiceId});
    }
  }

  public foundLabelOfChoice(choiceId){
    for(let choice of this.question.choices){
      console.info(choice._id,"==", choiceId);
      if(choice._id == choiceId){
        return choice.title;
      }
    }
    return "Réponse incorrect recue";
  }
}
