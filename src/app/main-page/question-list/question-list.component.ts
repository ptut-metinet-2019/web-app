import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {QuestionComponent} from "../question/question.component";
import {WebSocket} from "../../web-socket.service";
import {Questionnaire} from "../../model/questionnaire.model";
import {Question} from "../../model/question.model";
import {Choice} from "../../model/choice.model";

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  @Input("questionnaire") questionnaire: any;
  @ViewChild("question") questionComponent: QuestionComponent;
  selectedQuestion;

  constructor(private webSocket: WebSocket){}

  ngOnInit(){
    this.initQuestionListEvents();
  }

  public selectQuestion(question: any) {
    this.selectedQuestion = question;
  }

  public addQuestion(){
    let newQuestion = new Question(null, this.questionnaire._id,"Nouvelle question", "choice",10, false, new Date(), new Date(), [new Choice(null, null, "Réponse 1", false), new Choice(null, null, "Réponse 1", true)]);
    this.webSocket.addQuestion(newQuestion);
  }

  public clearQuestionComponent() {
    if (this.questionComponent != undefined) {
      this.questionComponent.clear();
    }
  }

  public deleteQuestion(question: any){
    this.webSocket.deleteQuestionn(question._id);
  }

  public updateQuestion(question){
    this.webSocket.updateQuestion(question, this.updatedQuestionCallback.bind(this));
  }


  /********************************
   * **********  QUESTIONS ********
   *******************************/

  public initQuestionListEvents(){
    this.webSocket.initQuestionListEvent(this.addingQuestionCallback.bind(this), this.deletedQuestionCallback.bind(this), this.updatedQuestionCallback.bind(this));
  }

  public addingQuestionCallback(question: any){
    this.questionnaire.questions.push(Question.fromJSONObject(question));
    this.selectedQuestion = question;
  }

  public deletedQuestionCallback(questionId: any){
    for(let question of this.questionnaire.questions){
      if(question.getId() == questionId){
        if(this.selectedQuestion == question){
          this.selectedQuestion = undefined;
        }
        this.questionnaire.questions.splice(this.questionnaire.questions.indexOf(question),1);
        return null;
      }
    }
  }

  public updatedQuestionCallback(quest: any){
    for(let question of this.questionnaire.questions){
      if(question.getId() == quest._id){
        let tmpChoice = question.getChoices();
        Object.assign(question, Question.fromJSONObject(quest));
        question.setChoices(tmpChoice);
      }
    }
  }
}
