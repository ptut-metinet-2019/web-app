import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {QuestionLaunchComponent} from "../question/question-launch.component";

@Component({
  selector: 'question-list-launch',
  templateUrl: './question-list-launch.component.html',
  styleUrls: ['./question-list-launch.component.scss']
})
export class QuestionListLaunchComponent implements OnInit{
  @Input("questionnaire") questionnaire: any;
  @ViewChild("question") questionLaunchComponent: QuestionLaunchComponent;
  public selectedQuestion: any;

  ngOnInit(){
    if(this.questionnaire != undefined && this.questionnaire.questions.length > 0){
      this.selectedQuestion = this.questionnaire.questions[0];
      this.questionnaire.questions[0].isLoaded = true;
    }

  }

  public goNextQuestion(){
    let currentIndex = this.questionnaire.questions.indexOf(this.selectedQuestion);
    if(this.questionnaire.questions[currentIndex+1] != undefined){
      this.selectedQuestion = this.questionnaire.questions[currentIndex+1];
      this.questionnaire.questions[currentIndex+1].isLoaded = true;
    }
  }

  public startTimer(){
    let cptMax = parseInt(this.questionLaunchComponent.cpt)+1;
    setInterval(function(){
      if(!this.questionLaunchComponent.isPaused && !this.questionLaunchComponent.isStoped && this.questionLaunchComponent.timerValue > 0){
        this.questionLaunchComponent.timerValue -= 1;
      }else{
        this.questionLaunchComponent.cptMax += 1;
      }
    }.bind(this),1000);
  }

  public pause(){
    this.questionLaunchComponent.pause();
  }

  public resume(){
    this.questionLaunchComponent.resume();
  }

  public stop(){
    this.questionLaunchComponent.stop();
  }
}
