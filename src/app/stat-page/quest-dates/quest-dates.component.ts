import {Component, forwardRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {QuestionsStatComponent} from "../questions/questions-stat.component";
import {QuestListStatComponent} from "../quest-list/quest-list-stat.component";

@Component({
  selector: 'quest-dates',
  templateUrl: './quest-dates.component.html',
  styleUrls: ['./quest-dates.component.scss']
})
export class QuestDatesComponent implements OnInit{
  @Input("questionnaire") questionnaire: any;
  @ViewChild("questions") questionsComponent: QuestionsStatComponent;
  public selectedLancement: any;


  constructor(@Inject(forwardRef(() => QuestListStatComponent)) private _parent: QuestListStatComponent) {

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
  }

  public clearQuestionComponent(){
    if(this.questionsComponent != undefined){
      this.questionsComponent.clear();
    }
  }

}
