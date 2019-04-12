import {Injectable} from "@angular/core";
import {Connection} from "./connection/connection.service";
import {ConnectedEvent, ConnectionEventListener, DisconnectedEvent} from "./connection/event/connection.model";
import {Router} from "@angular/router";
import {Questionnaire} from "./model/questionnaire.model";
import {Response} from "./connection/response.model";
import {Observable} from "rxjs";
import {
  QuestionnaireCreatedEvent,
  QuestionnaireDeletedEvent,
  QuestionnaireEventListener
} from "./connection/event/questionnaire.model";

@Injectable({
  providedIn: 'root'
})
export class WebSocket {
  private connection = new Connection();

  constructor(private router: Router){

  }

  public initLoginConnexion(token: string){
    this.connection.addListener(new ConnectionEventListener(function onConnected(event: ConnectedEvent)
    {
      // Connection ouverte
      this.router.navigate(['/', 'dashboard']);
    }.bind(this), function onDisconnected(event: DisconnectedEvent)
    {
      // Connection fermée
      this.router.navigate(['/', 'login']);
    }.bind(this)));

    this.connection.init(token);
  }

  public getAllQuestionnaires(callback){
    let request = this.connection.createRequest('questionnaire', 'all');
    request.onResponse(function (response: Response)
    {
      return callback(response.getData().questionnaires);
    }.bind(this));
    this.connection.send(request);
  }

  public initQuestionnaireListEvent(createdCallback, deletedCallback){
    this.connection.addListener(new QuestionnaireEventListener(function onCreated(event: QuestionnaireCreatedEvent)
    {
      // Questionnaire créé : event.getQuestionnaire()
      createdCallback(event.getQuestionnaire());
    }.bind(this), function onDeleted(event: QuestionnaireDeletedEvent)
    {
      // Questionnaire supprimé : event.getQuestionnaireId()
      deletedCallback(event.getQuestionnaireId());
    }.bind(this)));
  }

  public deleteQuestionnaire(_questionnaireId: any){
    let request = this.connection.createRequest('questionnaire', 'delete', {_id: _questionnaireId});
    this.connection.send(request);
  }

  public addQuestionnaire(questionnaire: {}){
    let request = this.connection.createRequest('questionnaire', 'create', questionnaire);
    this.connection.send(request);
  }

}
