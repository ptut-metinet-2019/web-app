import {Event, EventListener} from './event.model';
import {Questionnaire} from '../../model/questionnaire.model';

export class QuestionnaireCreatedEvent implements Event
{
  private questionnaire: Questionnaire;

  constructor(questionnaire: Questionnaire)
  {
    this.questionnaire = questionnaire;
  }

  public getQuestionnaire(): Questionnaire
  {
    return this.questionnaire;
  }
}

export class QuestionnaireUpdatedEvent implements Event
{
  private questionnaire: Questionnaire;

    constructor(questionnaire: Questionnaire)
    {
      this.questionnaire = questionnaire;
    }

  public getQuestionnaire(): Questionnaire
    {
      return this.questionnaire;
    }
}

export class QuestionnaireDeletedEvent implements Event
{
	private questionnaireId: string;

	constructor(questionnaireId: string)
	{
		this.questionnaireId = questionnaireId;
	}

	public getQuestionnaireId(): string
	{
		return this.questionnaireId;
	}
}

export class QuestionnaireEventListener implements EventListener
{
	private onCreated: ((event: QuestionnaireCreatedEvent) => void);
  private onDeleted: ((event: QuestionnaireDeletedEvent) => void);
  private onUpdated: ((event: QuestionnaireUpdatedEvent) => void);

	constructor(onCreated: ((event: QuestionnaireCreatedEvent) => void), onDeleted: ((event: QuestionnaireDeletedEvent) => void), onUpdated: ((event: QuestionnaireUpdatedEvent) => void))
	{
		this.onCreated = onCreated;
		this.onDeleted = onDeleted;
		this.onUpdated = onUpdated;
	}

	public handle(event: Event): void
	{
		if(event instanceof QuestionnaireCreatedEvent)
			this.onCreated.call(this, event);

    if(event instanceof QuestionnaireDeletedEvent)
      this.onDeleted.call(this, event);
    if(event instanceof QuestionnaireUpdatedEvent)
      this.onUpdated.call(this, event);
	}
}
