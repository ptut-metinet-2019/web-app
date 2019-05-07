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
    this.parentElement.deleteQuestionnaire(this.questionnaire);
  }

  onChange(){
    this.parentElement.updateQuestionnaire(this.questionnaire);
  }
}
