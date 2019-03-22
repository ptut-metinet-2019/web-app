import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'quest-list',
  templateUrl: './quest-list.component.html',
  styleUrls: ['./quest-list.component.scss']
})
export class QuestListComponent implements OnInit{
  questionnairesList: any[];
  selectedQuestionnaire: any;
  addingNewQuestionnaire: boolean;
  newQuestionnaireName: any;

  ngOnInit(){
    this.initQuestionnaireList();
  }

  public deleteQuestionnaire(questionnnaire){
    if(this.selectedQuestionnaire == questionnnaire){
      this.selectedQuestionnaire = undefined;
    }
    this.questionnairesList.splice(this.questionnairesList.indexOf(questionnnaire),1);
  }

  public loadQuestionnaire(questionnaire: any){
    //TODO : Load QCM via BD à partir du param questionnaire
   this.selectedQuestionnaire = questionnaire;
  }

  public addNewQuestionnaire() {
    this.questionnairesList.push({
      name: {
        value: this.newQuestionnaireName,
        isModeEdit: false
      }
    });
    this.newQuestionnaireName = "";
    this.addingNewQuestionnaire = false;
    console.info(this.questionnairesList)
  }

  public initQuestionnaireList(){
    this.questionnairesList = [
      //QUESTIONNAIRE 1
      {
        id: 1,
        name: {
          value: "Questionnaire 1",
          isModeEdit: false
        },
        timer:{
          value: "60",
          isModeEdit: false
        },
        questions: [
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
        ]
      },
      //QUESTIONNAIRE 2
      {
        id: 2,
        name: {
          value: "Questionnaire 2",
          isModeEdit: false
        },
        timer:{
          value: "",
          isModeEdit: false
        },
        questions: [
          {
            name: {
              value: "Ceci est la question 1 du questionnaire 2",
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
              value: "Ceci est la question 2 du questionnaire 2",
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
              value: "Ceci est la question 3 du questionnaire 2",
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
              value: "0",
              isModeEdit: false
            }
          }
        ]
      },
      //QUESTIONNAIRE 3
      {
        id: 3,
        name: {
          value: "Questionnaire 3",
          isModeEdit: false
        },
        timer:{
          value: "60",
          isModeEdit: false
        },
        questions: [
          {
            name: {
              value: "Ceci est la question 1 du questionnaire 3",
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
              value: "Ceci est la question 2 du questionnaire 3",
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
        ]
      }
    ];
  }
}
