import {Event, EventListener} from './event.model';
import {Questionnaire} from '../../model/questionnaire.model';

export class SessionInitEvent implements Event
{
  private questionnaire: Questionnaire;
  private phoneNumber: string;

  constructor(questionnaire: Questionnaire, phoneNumber: string)
  {
    this.questionnaire = questionnaire;
    this.phoneNumber = phoneNumber;
  }

  public getQuestionnaire(): Questionnaire
  {
    return this.questionnaire;
  }

  public getPhoneNumber(): string
  {
    return this.phoneNumber;
  }
}

export class SessionQuestionStart implements Event
{

}

export class SessionQuestionStop implements Event
{

}

export class SessionStop implements Event
{

}

export class SessionAnswer implements Event
{
  private answer;
  private choiceId;

  constructor(answer: any, choiceId: any)
  {
    this.answer = answer;
    this.choiceId = choiceId;
  }

  public getAnswer(){
    return this.answer;
  }

  public getChoiceId(){
    return this.choiceId;
  }
}

export class SessionEventListener implements EventListener
{
  private onInit: ((event: SessionInitEvent) => void);
  private onQuestionStart: ((event: SessionQuestionStart) => void);
  private onQuestionStop: ((event: SessionQuestionStop) => void);
  private onSessionStop: ((event: SessionStop) => void);
  private onAnswerReceived: ((event: SessionAnswer) => void);

  constructor(onInit: ((event: SessionInitEvent) => void), onSessionStop: ((event: SessionStop) => void))
  {
    this.onInit = onInit;
    this.onSessionStop = onSessionStop;
  }

  public construct(onQuestionStart: ((event: SessionQuestionStart) => void), onQuestionStop: ((event: SessionQuestionStop) => void), onSessionStop: ((event: SessionStop) => void), onAnswerReceived: ((event: SessionAnswer) => void))
  {
    this.onQuestionStart = onQuestionStart;
    this.onQuestionStop = onQuestionStop;
    this.onSessionStop = onSessionStop;
    this.onAnswerReceived = onAnswerReceived;
  }

  public handle(event: Event): void
  {
    if(event instanceof SessionInitEvent && this.onInit != undefined)
      this.onInit.call(this, event);
    if(event instanceof SessionQuestionStart && this.onQuestionStart != undefined)
      this.onQuestionStart.call(this, event);
    if(event instanceof SessionQuestionStop && this.onQuestionStop != undefined)
      this.onQuestionStop.call(this, event);
    if(event instanceof SessionStop && this.onSessionStop != undefined)
      this.onSessionStop.call(this, event);
    if(event instanceof SessionAnswer && this.onAnswerReceived != undefined)
      this.onAnswerReceived.call(this, event);
  }
}
