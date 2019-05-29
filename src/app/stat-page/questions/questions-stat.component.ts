import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {QuestDatesComponent} from "../quest-dates/quest-dates.component";

@Component({
  selector: 'questions-stat',
  templateUrl: './questions-stat.component.html',
  styleUrls: ['./questions-stat.component.scss']
})
export class QuestionsStatComponent implements OnInit{
  @Input("lancement") lancement: any;
  parentElement: QuestDatesComponent;

  constructor(@Inject(forwardRef(() => QuestDatesComponent)) private _parent:QuestDatesComponent) {
    this.parentElement = _parent;
  }

  ngOnInit(){
    // this.initQuestion();getAnswerLabel
  }

  public clear(){
    this.lancement = {};
  }

  public getAnswerLabel(choices, choiceId){
    console.info("getAnswerLabel()", choiceId);
    if(choiceId == undefined){
      return "";
    }
    for(let choice of choices){
      if(choice._id == choiceId){
        return choice.title;
      }
    }
  }
}
