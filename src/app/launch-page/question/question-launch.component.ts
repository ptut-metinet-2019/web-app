import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {QuestionListLaunchComponent} from "../question-list/question-list-launch.component";

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

  constructor(@Inject(forwardRef(() => QuestionListLaunchComponent)) private _parent:QuestionListLaunchComponent) {
    this.parentElement = _parent;
  }

  ngOnInit(){
    this.loadTimer();
  }

  public loadTimer(){
    if(this.question.timer.value != undefined && this.question.timer.value != 0){
      this.cpt = this.question.timer.value;
      this.timerValue = parseInt(this.question.timer.value);
    }else{
      this.cpt = this.parentElement.questionnaire.timer.value;
      this.timerValue = parseInt(this.parentElement.questionnaire.timer.value);
    }
    let cptMax = parseInt(this.cpt)+1;
    //for(let i = 1; i < cptMax; i++){
      setInterval(function(){
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
    this.isPaused = true;
    this.isStoped = true;
    this.timerValue = "Questionnaire arreté";
  }

  public goNextQuestion(){
    this.parentElement.goNextQuestion();
    this.loadTimer();
  }
}
