import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {QuestionComponent} from "../question/question.component";

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit{
  @Input("questionnaire") questionnaire: any;
  @ViewChild("question") questionComponent: QuestionComponent;
  selectedQuestion;

  ngOnInit(){
    // this.initQuestionList();
  }

  public selectQuestion(question: any){
    this.selectedQuestion = question;
  }

  public addQuestion(){
    //TODO Ajout d'une questions
    let newQuestion = {
      name: {
        value: "Nouvelle questions",
        isModeEdit: false
      },
      propositions: [
        {
          label: "Réponse 1",
          isModeEdit: false
        },
        {
          label: "Réponse 2",
          isModeEdit: false
        }
      ],
      timer: {
        value: "60",
        isModeEdit: false
      }
    };
    if(this.questionnaire.questions === undefined){
      this.questionnaire.questions = [];
    }
    this.questionnaire.questions.push(newQuestion);
    this.selectedQuestion = newQuestion;
  }

  public clearQuestionComponent(){
    if(this.questionComponent != undefined){
      this.questionComponent.clear();
    }
  }

  public deleteQuestion(question: any){
    if(this.selectedQuestion == question){
      this.selectedQuestion = undefined;
    }
    this.questionnaire.questions.splice(this.questionnaire.questions.indexOf(question),1);
  }

  public initQuestionList(){
    //DON'T USE THIS
    this.questionnaire = [
      {
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
      },
      {
        name: {
          value: "Ceci est la questions 2",
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
          value: "600",
          isModeEdit: false
        }
      },
      {
        name: {
          value: "Ceci est la questions 3",
          isModeEdit: false
        },
        propositions: [
          {
            label: "Tres bien",
            isModeEdit: false
          },
          {
            label: "Moyen",
            isModeEdit: false
          },
          {
            label: "Pas bon",
            isModeEdit: false
          }
        ],
        timer: {
          value: "10",
          isModeEdit: false
        }
      }
    ];
  }

}
