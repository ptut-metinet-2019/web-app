import {Component, OnInit, ViewChild} from '@angular/core';
import {QuestionListComponent} from "../question-list/question-list.component";
import {WebSocket} from "../../web-socket.service";
import {Questionnaire} from "../../model/questionnaire.model";

@Component({
  selector: 'quest-list',
  templateUrl: './quest-list.component.html',
  styleUrls: ['./quest-list.component.scss']
})
export class QuestListComponent implements OnInit{
  @ViewChild("questionList") questionListComponent: QuestionListComponent;
  questionnairesList: Questionnaire[];
  selectedQuestionnaire: any;
  addingNewQuestionnaire: boolean;
  newQuestionnaireName: any;

  constructor(private webSocket: WebSocket){

  }

  ngOnInit(){
    this.questionnairesList = [];
    this.initQuestionnaireListFromDB();
  }

  public clearQuestion(){
    this.questionListComponent.clearQuestionComponent();
  }

  public deleteQuestionnaire(questionnnaire){
    console.info(questionnnaire);
    this.webSocket.deleteQuestionnaire(questionnnaire.getId());
  }

  public updateQuestionnaire(questionnnaire){
    console.info(questionnnaire);
    this.webSocket.updateQuestionnaire(questionnnaire, this.updatedQuestionnaireCallback.bind(this));
  }

  public loadQuestionnaire(questionnaire: any){
    if(this.selectedQuestionnaire != questionnaire){
      this.clearQuestion();
      this.selectedQuestionnaire = questionnaire;
      //TODO : Load QCM via BD à partir du param questionnaire
      this.webSocket.loadQuestionnaire(this.selectedQuestionnaire.id, this.onLoadQuestionnaire.bind(this));
    }
  }

  public onLoadQuestionnaire(questionnaire){
    console.info("onLoadQuestionnaire", questionnaire);
  }

  public addNewQuestionnaire() {
    if(this.newQuestionnaireName == undefined || this.newQuestionnaireName == ""){
      this.newQuestionnaireName = "";
      this.addingNewQuestionnaire = false;
      return null;
    }
    let newQuestionnaire = {
      name: this.newQuestionnaireName,
      timer: 60,
      autoplayTimeout: 60
    };
    this.webSocket.addQuestionnaire(newQuestionnaire);
  }

  public initQuestionnaireListFromDB(){
    this.webSocket.getAllQuestionnaires(this.fillDatas.bind(this));
  }

  public fillDatas(datas?: any){
    for(let data of datas){
      this.questionnairesList.push(Questionnaire.fromJSONObject(data));
    }
    this.initQuestionnaireListEvents();
    if(this.questionnairesList.length > 0){
      this.selectedQuestionnaire = this.questionnairesList[0];
    }
  }

  public initQuestionnaireListEvents(){
    this.webSocket.initQuestionnaireListEvent(this.addingQuestionnaireCallback.bind(this), this.deletedQuestionnaireCallback.bind(this), this.updatedQuestionnaireCallback.bind(this));
  }

  public addingQuestionnaireCallback(questionnaire: any){
    this.questionnairesList.push(questionnaire);
    this.newQuestionnaireName = "";
    this.addingNewQuestionnaire = false;
    this.selectedQuestionnaire = questionnaire;
  }

  public deletedQuestionnaireCallback(questionnaireId: any){
    for(let questionnaire of this.questionnairesList){
      if(questionnaire.getId() === questionnaireId){
        if(questionnaire == this.selectedQuestionnaire){
          this.selectedQuestionnaire = undefined;
        }
        this.questionnairesList.splice(this.questionnairesList.indexOf(questionnaire),1);
        return null;
      }
    }
  }

  public updatedQuestionnaireCallback(quest: any){
    for(let questionnaire of this.questionnairesList){
      if(questionnaire.getId() === quest._id){
        questionnaire = Questionnaire.fromJSONObject(quest);
      }
    }
  }

}
