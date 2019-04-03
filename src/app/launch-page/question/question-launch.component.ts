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
  public timerValue: number;

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
    for(let i = 1; i < parseInt(this.cpt)+1; i++){
      setTimeout(function(){
        this.timerValue -= 1;
      }.bind(this),1000*i);
    }
  }

  public goNextQuestion(){
    this.parentElement.goNextQuestion();
    this.loadTimer();
  }
}
