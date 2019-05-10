import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {QuestionListComponent} from "../question-list/question-list.component";

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit{
  @Input("question") question: any;
  parentElement: QuestionListComponent;

  constructor(@Inject(forwardRef(() => QuestionListComponent)) private _parent:QuestionListComponent) {
    this.parentElement = _parent;
  }

  ngOnInit(){

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

  public deleteQuestion(question){
    this.parentElement.deleteQuestion(question);
  }

  public addProposition(){
    //TODO Ajout d'une proposition
    this.question.propositions.push({
      label: "Nouvelle proposition",
      isModeEdit: true
    });
  }

  public updateQuestion(){
    this.parentElement.updateQuestion(this.question);
  }

  public deleteProposition(propositionToRemove: any){
    //TODO Remove proposition from List
    console.info("Proposition to remove : ", propositionToRemove);
    this.question.propositions.splice(this.question.propositions.indexOf(propositionToRemove),1);
  }
}
