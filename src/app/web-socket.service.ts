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
  QuestionnaireEventListener, QuestionnaireUpdatedEvent
} from "./connection/event/questionnaire.model";
import {
  QuestionCreatedEvent,
  QuestionDeletedEvent,
  QuestionEventListener,
  QuestionUpdatedEvent
} from "./connection/event/question.model";
import {
  ChoiceCreatedEvent,
  ChoiceDeletedEvent,
  ChoiceEventListener,
  ChoiceUpdatedEvent
} from "./connection/event/choice.model";
import {
  SessionAnswer,
  SessionEventListener,
  SessionInitEvent,
  SessionQuestionStart,
  SessionQuestionStop, SessionStop
} from "./connection/event/session.model";

@Injectable({
  providedIn: 'root'
})
export class WebSocket {
  private connection = new Connection();
  private sessionListener;
  public sessionInitialized = false;
  public session2Initialized = false;

  constructor(private router: Router){

  }

  /********************************
   * **********  LOGIN ************
   *******************************/
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


  /********************************
   * ******  QUESTIONNAIRES *******
   *******************************/
  public getAllQuestionnaires(callback){
    let request = this.connection.createRequest('questionnaire', 'all');
    request.onResponse(function (response: Response)
    {
      return callback(response.getData().questionnaires);
    }.bind(this));
    this.connection.send(request);
  }

  public initQuestionnaireListEvent(createdCallback, deletedCallback, updatedCallback){
    this.connection.addListener(new QuestionnaireEventListener(function onCreated(event: QuestionnaireCreatedEvent)
    {
      // Questionnaire créé : event.getQuestionnaire()
      createdCallback(event.getQuestionnaire());
    }.bind(this), function onDeleted(event: QuestionnaireDeletedEvent)
    {
      // Questionnaire supprimé : event.getQuestionnaireId()
      deletedCallback(event.getQuestionnaireId());
    }.bind(this), function onUpdated(event: QuestionnaireUpdatedEvent)
    {
      // Questionnaire mis à jour : event.getQuestionnaire()
      updatedCallback(event.getQuestionnaire());
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

  public updateQuestionnaire(questionnaire, callback){
    let request = this.connection.createRequest('questionnaire', 'update', questionnaire);
    request.onResponse(function (response: Response)
    {
      console.info("update response = ", response);
      return callback(response.getData());
    }.bind(this));
    this.connection.send(request);
  }


  /********************************
   * **********  QUESTIONS ********
   *******************************/

  public initQuestionListEvent(createdCallback, deletedCallback, updatedCallback){
    this.connection.addListener(new QuestionEventListener(function onCreated(event: QuestionCreatedEvent)
    {
      // Question créé : event.getQuestion()
      createdCallback(event.getQuestion());
    }.bind(this), function onDeleted(event: QuestionDeletedEvent)
    {
      // Question supprimé : event.getQuestionId()
      deletedCallback(event.getQuestionId());
    }.bind(this), function onUpdated(event: QuestionUpdatedEvent)
    {
      // Question mis à jour : event.getQuestion()
      updatedCallback(event.getQuestion());
    }.bind(this)));
  }

  public loadQuestionnaireQuestions(questionnaireId, callback){
    let request = this.connection.createRequest('question', 'get', {questionnaireId: questionnaireId});
    request.onResponse(function (response: Response)
    {
      return callback(questionnaireId, response.getData());
    }.bind(this));
    this.connection.send(request);
  }

  public addQuestion(question: {}){
    let request = this.connection.createRequest('question', 'create', question);
    this.connection.send(request);
  }

  public deleteQuestionn(questionId: any){
    let request = this.connection.createRequest('question', 'delete', {_id: questionId});
    this.connection.send(request);
  }

  public updateQuestion(question, callback){
    let request = this.connection.createRequest('question', 'update', question);
    request.onResponse(function (response: Response)
    {
      console.info("updated question = ", response);
      return callback(response.getData());
    }.bind(this));
    this.connection.send(request);
  }


  /********************************
   * **********  CHOICES **********
   *******************************/
  public initChoiceListEvent(createdCallback, deletedCallback, updatedCallback){
    this.connection.addListener(new ChoiceEventListener(function onCreated(event: ChoiceCreatedEvent)
    {
      // Choice créé : event.getQuestion()
      createdCallback(event.getChoice());
    }.bind(this), function onDeleted(event: ChoiceDeletedEvent)
    {
      // Choice supprimé : event.getQuestionId()
      deletedCallback(event.getChoiceId());
    }.bind(this), function onUpdated(event: ChoiceUpdatedEvent)
    {
      // Choice mis à jour : event.getQuestion()
      updatedCallback(event.getChoice());
    }.bind(this)));
  }

  public addChoice(choice: {}){
    let request = this.connection.createRequest('choice', 'create', choice);
    this.connection.send(request);
  }

  public updateChoice(choice, callback){
    let request = this.connection.createRequest('choice', 'update', choice);
    request.onResponse(function (response: Response)
    {
      return callback(response.getData());
    }.bind(this));
    this.connection.send(request);
  }

  public removeChoice(choiceId: any){
    let request = this.connection.createRequest('choice', 'delete', {_id: choiceId});
    this.connection.send(request);
  }

  /********************************
   ***********  LAUNCH ************
   *******************************/
  public initSessionEvent(initCallback, endSessionCallback){
    if(this.sessionInitialized == true){
      return;
    }
    this.sessionListener = new SessionEventListener(function onInit(event: SessionInitEvent)
    {
      initCallback(event.getQuestionnaire(), event.getPhoneNumber());
    }.bind(this), function onSessionStop(event: SessionQuestionStop)
    {
      endSessionCallback();
    }.bind(this));
    this.connection.addListener(this.sessionListener);
    this.sessionInitialized = true;
  }

  public initSessionEvent2(startQuestionCallback, endQuestionCallback, endSessionCallback, answerReceivedCallback){
    if(this.session2Initialized == true){
      return;
    }
    this.sessionListener.construct(function onQuestionStart(event: SessionQuestionStart)
    {
      startQuestionCallback();
    }.bind(this), function onQuestionStop(event: SessionQuestionStop)
    {
      endQuestionCallback();
    }.bind(this), function onSessionStop(event: SessionStop)
    {
      endSessionCallback();
    }.bind(this), function onAnswerReceived(event: SessionAnswer)
    {
      answerReceivedCallback(event.getAnswer(), event.getChoiceId());
    }.bind(this));
    this.session2Initialized = true;
  }

  public initLaunch(questionnaireId){
    let request = this.connection.createRequest('session','init', {questionnaireId: questionnaireId});
    console.info(questionnaireId);
    this.connection.send(request);
  }

  public startLaunch(){
    let request = this.connection.createRequest('session','start');
    this.connection.send(request);
  }

  public skipLaunch(){
    let request = this.connection.createRequest('session','skip');
    this.connection.send(request);
  }

  public stopLaunch(){
    let request = this.connection.createRequest('session','stop');
    this.connection.send(request);
  }

  public nextLaunch(){
    let request = this.connection.createRequest('session','next');
    this.connection.send(request);
  }

  /********************************
   ************  STATS ************
   *******************************/
  public getAllLancements(questionnaireId, callback){
    let request = this.connection.createRequest('session','all', {questionnaireId: questionnaireId});
    request.onResponse(function (response: Response)
    {
      return callback(questionnaireId, response.getData())
    }.bind(this));
    this.connection.send(request);
  }

  public getStats(lancementId, callback){
    let request = this.connection.createRequest('session','get', {_id: lancementId});
    request.onResponse(function (response: Response)
    {
      return callback(response.getData())
    }.bind(this));
    this.connection.send(request);
  }

}
