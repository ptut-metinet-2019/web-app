import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestListStatComponent} from "./quest-list/quest-list-stat.component";

@Component({
  selector: 'main-stat-page',
  templateUrl: './stat-page.component.html',
  styleUrls: ['./stat-page.component.scss']
})
export class StatPageComponent implements OnInit{
  @ViewChild("questListStat") questListStat: QuestListStatComponent;
  private questId: number;
  public questionnaire: any;
  public questLoaded = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.questId = +params['id']; // (+) converts string 'id' to a number
      this.loadQuestionnaire();
    });
  }

  private loadQuestionnaire(){
    //TODO : LOAD LE QUESTIONNAIRE VIA DB
    this.questionnaire = {
      id: 1,
      name: {
        value: "Questionnaire 1"
      },
      timer:{
        value: "10"
      },
      questions: [
        {
          name: {
            value: "Ceci est la questions 1"
          },
          propositions: [
            {
              label: "Ceci est la réponse 1"
            },
            {
              label: "Ceci est la réponse 2"
            },
            {
              label: "Ceci est la réponse 3"
            }
          ],
          timer: {
            value: "15"
          }
        },
        {
          name: {
            value: "Ceci est la questions 2"
          },
          propositions: [
            {
              label: "Ceci est la réponse 1"
            },
            {
              label: "Ceci est la réponse 2"
            },
            {
              label: "Ceci est la réponse 3"
            }
          ],
          timer: {
            value: "30"
          }
        },
        {
          name: {
            value: "Ceci est la questions 3"
          },
          propositions: [
            {
              label: "Tres bien"
            },
            {
              label: "Moyen"
            },
            {
              label: "Pas bon"
            }
          ],
          timer: {
            value: "0"
          }
        }
      ]
    };
    this.questLoaded = true;
  }
}
