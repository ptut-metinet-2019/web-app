import {Event, EventListener} from './event.model';
import {Question} from '../../model/question.model';

export class QuestionCreatedEvent implements Event
{
  private question: Question;

  constructor(question: Question)
  {
    this.question = question;
  }

  public getQuestion(): Question
  {
    return this.question;
  }
}

export class QuestionUpdatedEvent implements Event
{
  private question: Question;

  constructor(question: Question)
  {
    this.question = question;
  }

  public getQuestion(): Question
  {
    return this.question;
  }
}

export class QuestionDeletedEvent implements Event
{
  private questionId: string;

  constructor(questionId: string)
  {
    this.questionId = questionId;
  }

  public getQuestionId(): string
  {
    return this.questionId;
  }
}

export class QuestionEventListener implements EventListener
{
  private onCreated: ((event: QuestionCreatedEvent) => void);
  private onDeleted: ((event: QuestionDeletedEvent) => void);
  private onUpdated: ((event: QuestionUpdatedEvent) => void);

  constructor(onCreated: ((event: QuestionCreatedEvent) => void), onDeleted: ((event: QuestionDeletedEvent) => void), onUpdated: ((event: QuestionUpdatedEvent) => void))
  {
    this.onCreated = onCreated;
    this.onDeleted = onDeleted;
    this.onUpdated = onUpdated;
  }

  public handle(event: Event): void
  {
    if(event instanceof QuestionCreatedEvent)
      this.onCreated.call(this, event);

    if(event instanceof QuestionDeletedEvent)
      this.onDeleted.call(this, event);
    if(event instanceof QuestionUpdatedEvent)
      this.onUpdated.call(this, event);
  }
}
