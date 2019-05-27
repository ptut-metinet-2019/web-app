import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {QuestionListComponent} from "../question-list/question-list.component";
import {Choice} from "../../model/choice.model";
import {WebSocket} from "../../web-socket.service";
import {Question} from "../../model/question.model";

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit{
  @Input("question") question: any;
  parentElement: QuestionListComponent;

  constructor(@Inject(forwardRef(() => QuestionListComponent)) private _parent:QuestionListComponent, private webSocket: WebSocket) {
    this.parentElement = _parent;
  }

  ngOnInit(){
    this.initChoicenListEvents();
  }

  public onChangeType(event){
    if(event.target.value == "Question à réponse libre"){
      this.question.type = "free";
      this.updateQuestion();
    }else if(event.target.value == "Question à choix multiple"){
      this.question.type = "choice";
      this.updateQuestion();
    }
  }

  public clear(){
    this.question = {};
  }

  public updateQuestion(){
    this.parentElement.updateQuestion(this.question);
  }

  public deleteQuestion(question){
    this.parentElement.deleteQuestion(question);
  }



  public addProposition(){
    let newChoice = new Choice(null, this.question._id, "Nouvelle proposition", false);
    this.webSocket.addChoice(newChoice);
  }

  public updateProposition(choice: any){
    this.webSocket.updateChoice(choice, this.updatedPropositionCallback.bind(this));
  }

  public deleteProposition(propositionToRemove: any){
    this.webSocket.removeChoice(propositionToRemove._id);
  }

  public updatedPropositionCallback(updatedChoice: any){
    for(let choice of this.question.choices){
      if(choice.getId() == updatedChoice._id){
        Object.assign(choice, Question.fromJSONObject(updatedChoice));
      }
    }
  }


  /********************************
   * **********  CHOICE ** ********
   *******************************/
  public initChoicenListEvents(){
    this.webSocket.initChoiceListEvent(this.addingChoiceCallback.bind(this), this.deletedChoiceCallback.bind(this), this.updatedChoiceCallback.bind(this));
  }

  public addingChoiceCallback(choice: any){
    if(this.question.choices == undefined){
      this.question.choices = [];
    }
    this.question.choices.push(Choice.fromJSONObject(choice));
  }

  public deletedChoiceCallback(choiceId: any){
    for(let choice of this.question.choices){
      if(choice._id == choiceId){
        this.question.choices.splice(this.question.choices.indexOf(choice),1);
        return null;
      }
    }
  }

  public updatedChoiceCallback(choiceUpdated: any){
    for(let choice of this.question.choices){
      if(choice.getId() == choiceUpdated._id){
        Object.assign(choice, Choice.fromJSONObject(choiceUpdated));
      }
    }
  }
}
