import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {QuestListComponent} from "../quest-list/quest-list.component";
import {Router} from "@angular/router";

@Component({
  selector: 'quest-header',
  templateUrl: './quest-header.component.html',
  styleUrls: ['./quest-header.component.scss']
})
export class QuestHeaderComponent implements OnInit{
  @Input("questionnaire") questionnaire: any;

  parentElement: QuestListComponent;

  constructor(@Inject(forwardRef(() => QuestListComponent)) private _parent: QuestListComponent,
              private router: Router) {
    this.parentElement = _parent;
  }

  ngOnInit(){
    //console.info("questionnaire :",this.questionnaire);
  }

  deleteQuestionnaire() {
    //TODO Suppression d'une question
    console.info("Delete new question", this);
    this.parentElement.deleteQuestionnaire(this.questionnaire);
  }

  public toLaunchComponent(){
    this.router.navigate(['/launch'], this.questionnaire.id);
  }

  public toStatsComponent(){

  }
}
