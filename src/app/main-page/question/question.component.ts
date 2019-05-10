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
    // this.initQuestion();
  }

  public clear(){
    this.question = {};
  }

  public initQuestion(){
    this.question = {
      name: {
        value: "Ceci est la questions 1",
        isModeEdit: false
      },
      propositions: [
        {
          label: "Ceci est la réponse 1",
          isModeEdit: false
        },
        {
          label: "Ceci est la réponse 2",
          isModeEdit: false
        },
        {
          label: "Ceci est la réponse 3",
          isModeEdit: false
        }
      ],
      timer: {
        value: "60",
        isModeEdit: false
      }
    }
  }

  public deleteQuestion(question){
    this.parentElement.deleteQuestion(question);
  }

  public addProposition(){
    //TODO Ajout d'une proposition
    console.info("Add new questions");
    this.question.propositions.push({
      label: "Nouvelle proposition",
      isModeEdit: true
    });
  }

  public deleteProposition(propositionToRemove: any){
    //TODO Remove proposition from List
    console.info("Proposition to remove : ", propositionToRemove);
    this.question.propositions.splice(this.question.propositions.indexOf(propositionToRemove),1);
  }
}
