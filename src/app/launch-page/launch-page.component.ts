import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'main-page',
  templateUrl: './launch-page.component.html',
  styleUrls: ['./launch-page.component.scss']
})
export class LaunchPageComponent implements OnInit{

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
            value: "Ceci est la question 1"
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
            value: "Ceci est la question 2"
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
            value: "Ceci est la question 3"
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
