import {Component, forwardRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {QuestionsStatComponent} from "../questions/questions-stat.component";
import {QuestListStatComponent} from "../quest-list/quest-list-stat.component";
import {WebSocket} from "../../web-socket.service";

@Component({
  selector: 'quest-dates',
  templateUrl: './quest-dates.component.html',
  styleUrls: ['./quest-dates.component.scss']
})
export class QuestDatesComponent implements OnInit{
  @Input("questionnaire") questionnaire: any;
  @ViewChild("questions") questionsComponent: QuestionsStatComponent;
  public selectedLancement: any;


  constructor(@Inject(forwardRef(() => QuestListStatComponent)) private _parent: QuestListStatComponent, private webSocket: WebSocket) {

  }

  ngOnInit(){
    // this.initQuestionList();
  }

  public selectLancement(lancement: any){
    this.selectedLancement = lancement;
    try {
      this._parent.statHeader.selectedLancement = lancement;
    }catch (e) {
      console.error("ERROR UPDATING SELECTED LANCEMENT IN HEADER", e)
    }
    this.webSocket.getStats(this.selectedLancement._id, this.getStatCallback.bind(this));
  }

  public clearQuestionComponent(){
    if(this.questionsComponent != undefined){
      this.questionsComponent.clear();
    }
  }

  public getStatCallback(datas){
    console.info("getStatCallback()", datas.questionnaire.questions);
    this.selectedLancement = datas.questionnaire;
    this.calculateAnswerPercent(this.selectedLancement);
  }

  public calculateAnswerPercent(lancement){
    console.info("calculateAnswerPercent()", lancement);
    for(let question of lancement.questions){
      let nbAnswers = question.answers.length;
      let choiceCount = new Map();
      //Put different choices in a map
      for(let choice of question.choices){
        choiceCount.set(choice._id, 0);
      }

      //Met à jour les valeurs de la map en fonction de leur freq d'apparition
      for(let answer of question.answers){
        if(choiceCount.has(answer.choiceId)){
          choiceCount.set(answer.choiceId, choiceCount.get(answer.choiceId)+1);
        }else{
          choiceCount.set(answer.choiceId, 1);
        }
      }

      //Met la freq calculée dans le JSON
      for(let choice of question.choices){
        choice.stat = (choiceCount.get(choice._id)/nbAnswers)*100;
      }

    }
  }
}
