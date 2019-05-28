import {Component, OnInit, ViewChild} from '@angular/core';
import {QuestDatesComponent} from "../quest-dates/quest-dates.component";
import {QuestHeaderStatComponent} from "../quest-header/quest-header-stat.component";
import {WebSocket} from "../../web-socket.service";
import {Questionnaire} from "../../model/questionnaire.model";

@Component({
  selector: 'quest-list-stat',
  templateUrl: './quest-list-stat.component.html',
  styleUrls: ['./quest-list-stat.component.scss']
})
export class QuestListStatComponent implements OnInit{
  @ViewChild("questionDatesList") questionDatesList: QuestDatesComponent;
  @ViewChild("statHeader") statHeader: QuestHeaderStatComponent;
  questionnairesList: any[];
  selectedQuestionnaire: any;

  constructor(private webSocket: WebSocket){

  }

  ngOnInit(){
    this.initQuestionnaireListFromBD();
  }

  public clearQuestion(){
    this.questionDatesList.clearQuestionComponent();
    this.statHeader.selectedLancement = undefined;
  }


  public loadQuestionnaireLancement(questionnaire: any){
    if(this.selectedQuestionnaire != questionnaire){
      this.clearQuestion();
      this.selectedQuestionnaire = questionnaire;
      this.statHeader.questionnaire = this.selectedQuestionnaire;
      this.questionDatesList.questionnaire = this.selectedQuestionnaire;
    }
    this.webSocket.getAllLancements(this.selectedQuestionnaire._id, this.onLoadLancements.bind(this));
  }

  public initQuestionnaireListFromBD(){
    this.questionnairesList = [];
    this.webSocket.getAllQuestionnaires(this.fillDatas.bind(this));
  }

  public fillDatas(datas?: any){
    for(let data of datas){
      this.questionnairesList.push(Questionnaire.fromJSONObject(data));
    }
    if(this.questionnairesList.length > 0){
      this.selectedQuestionnaire = this.questionnairesList[0];
      this.statHeader.questionnaire = this.selectedQuestionnaire;
      this.questionDatesList.questionnaire = this.selectedQuestionnaire;
      this.webSocket.getAllLancements(this.selectedQuestionnaire._id, this.onLoadLancements.bind(this));
    }
  }

  public onLoadLancements(questionnaireId, questionnaireLancements){
    for(let questionnaire of this.questionnairesList){
      if(questionnaire.getId() == questionnaireId){
        questionnaire.lancements = questionnaireLancements;
      }
    }
  }

  public initQuestionnaireList(){
    this.questionnairesList = [
      //QUESTIONNAIRE 1
      {
        id: 1,
        name: {
          value: "Questionnaire 1"
        },
        timer:{
          value: "60"
        },
        lancements : [
          {
            date: "01/01/2019 16h40",
            questions: [
              {
                name: {
                  value: "Ceci est la questions 1"
                },
                propositions: [
                  {
                    label: "Ceci est la réponse 1",
                    stat: 50
                  },
                  {
                    label: "Ceci est la réponse 2",
                    stat: 50
                  },
                  {
                    label: "Ceci est la réponse 3",
                    stat: 0
                  }
                ],
                timer: {
                  value: "60"
                }
              },
              {
                name: {
                  value: "Ceci est la questions 2"
                },
                propositions: [
                  {
                    label: "Ceci est la réponse 1",
                    stat: 100
                  },
                  {
                    label: "Ceci est la réponse 2",
                    stat: 0
                  },
                  {
                    label: "Ceci est la réponse 3",
                    stat: 0
                  }
                ],
                timer: {
                  value: "600"
                }
              },
              {
                name: {
                  value: "Ceci est la questions 3"
                },
                propositions: [
                  {
                    label: "Tres bien",
                    stat: 50
                  },
                  {
                    label: "Moyen",
                    stat: 50
                  },
                  {
                    label: "Pas bon",
                    stat: 0
                  }
                ],
                timer: {
                  value: "10"
                }
              }
            ],
          },
          {
            date: "01/02/2019 18h04",
            questions: [
              {
                name: {
                  value: "Ceci est la questions 1"
                },
                propositions: [
                  {
                    label: "Ceci est la réponse 1",
                    stat: 0
                  },
                  {
                    label: "Ceci est la réponse 2",
                    stat: 20
                  },
                  {
                    label: "Ceci est la réponse 3",
                    stat: 80
                  }
                ],
                timer: {
                  value: "60"
                }
              },
              {
                name: {
                  value: "Ceci est la questions 2"
                },
                propositions: [
                  {
                    label: "Ceci est la réponse 1",
                    stat: 0
                  },
                  {
                    label: "Ceci est la réponse 2",
                    stat: 100
                  },
                  {
                    label: "Ceci est la réponse 3",
                    stat: 0
                  }
                ],
                timer: {
                  value: "600"
                }
              },
              {
                name: {
                  value: "Ceci est la questions 3"
                },
                propositions: [
                  {
                    label: "Tres bien",
                    stat: 55
                  },
                  {
                    label: "Moyen",
                    stat: 45
                  },
                  {
                    label: "Pas bon",
                    stat: 0
                  }
                ],
                timer: {
                  value: "10"
                }
              }
            ]
          }
        ]
      },
      //QUESTIONNAIRE 2
      {
        id: 2,
        name: {
          value: "Questionnaire 2",
        },
        timer:{
          value: "",
        },
        lancements: [
          {
            date: "01/03/1999 23h20",
            questions: [
              {
                name: {
                  value: "Ceci est la questions 1 du questionnaire 2",
                },
                propositions: [
                  {
                    label: "Ceci est la réponse 1",
                    stat: 0
                  },
                  {
                    label: "Ceci est la réponse 2",
                    stat: 0
                  },
                  {
                    label: "Ceci est la réponse 3",
                    stat: 100
                  }
                ],
                timer: {
                  value: "60",
                }
              },
              {
                name: {
                  value: "Ceci est la questions 2 du questionnaire 2",
                },
                propositions: [
                  {
                    label: "Ceci est la réponse 1",
                    stat: 0
                  },
                  {
                    label: "Ceci est la réponse 2",
                    stat: 100
                  },
                  {
                    label: "Ceci est la réponse 3",
                    stat: 0
                  }
                ],
                timer: {
                  value: "600",
                }
              },
              {
                name: {
                  value: "Ceci est la questions 3 du questionnaire 2",
                },
                propositions: [
                  {
                    label: "Tres bien",
                    stat: 74
                  },
                  {
                    label: "Moyen",
                    stat: 26
                  },
                  {
                    label: "Pas bon",
                    stat: 0
                  }
                ],
                timer: {
                  value: "0",
                }
              }
            ]
          },
          {
            date: "01/03/2009 23h20",
            questions: [
              {
                name: {
                  value: "Ceci est la questions 1 du questionnaire 2",
                },
                propositions: [
                  {
                    label: "Ceci est la réponse 1",
                    stat: 30
                  },
                  {
                    label: "Ceci est la réponse 2",
                    stat: 30
                  },
                  {
                    label: "Ceci est la réponse 3",
                    stat: 40
                  }
                ],
                timer: {
                  value: "60",
                }
              },
              {
                name: {
                  value: "Ceci est la questions 2 du questionnaire 2",
                },
                propositions: [
                  {
                    label: "Ceci est la réponse 1",
                    stat: 0
                  },
                  {
                    label: "Ceci est la réponse 2",
                    stat: 100
                  },
                  {
                    label: "Ceci est la réponse 3",
                    stat: 0
                  }
                ],
                timer: {
                  value: "600",
                }
              },
              {
                name: {
                  value: "Ceci est la questions 3 du questionnaire 2",
                },
                propositions: [
                  {
                    label: "Tres bien",
                    stat: 100
                  },
                  {
                    label: "Moyen",
                    stat: 0
                  },
                  {
                    label: "Pas bon",
                    stat: 0
                  }
                ],
                timer: {
                  value: "0",
                }
              }
            ]
          }
        ]
      }
    ];
  }
}
