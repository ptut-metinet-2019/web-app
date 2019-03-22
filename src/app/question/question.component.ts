import {Component, forwardRef, Inject, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {QuestionListComponent} from "../question-list/question-list.component";

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnChanges, OnInit{
  @Input("question") question: any;
  parentElement: QuestionListComponent;

  constructor(@Inject(forwardRef(() => QuestionListComponent)) private _parent:QuestionListComponent) {
    this.parentElement = _parent;
  }

  ngOnInit(){
    // this.initQuestion();
  }

  ngOnChanges(changes: SimpleChanges) {
    const question: SimpleChange = changes.question;
    console.log('prev value: ', question.previousValue);
    console.log('current value: ', question.currentValue);
    //if((question.previousValue =! undefined &&  question.currentValue != undefined) && (question.previousValue =! question.currentValue)){
    //  this.question = undefined;
    //}
  }

  public initQuestion(){
    this.question = {
      name: {
        value: "Ceci est la question 1",
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

  public deleteQuestion(){
    //TODO Suppression d'une question
    console.info("Removing question", this);
    this.parentElement.deleteQuestion(this.question);
  }

  public addProposition(){
    //TODO Ajout d'une proposition
    console.info("Add new question");
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
