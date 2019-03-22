import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit{
  @Input("questionnaire") questionnaire: any;
  selectedQuestion;

  ngOnInit(){
    // this.initQuestionList();
  }

  public selectQuestion(question: any){
    this.selectedQuestion = question;
  }

  public addQuestion(){
    //TODO Ajout d'une question
    console.info("Add new question");
    this.questionnaire.questions.push({
      name: {
        value: "Nouvelle question",
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
    });
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
      },
      {
        name: {
          value: "Ceci est la question 2",
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
          value: "Ceci est la question 3",
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
