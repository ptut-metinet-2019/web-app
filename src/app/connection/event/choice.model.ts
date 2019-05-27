import {Event, EventListener} from './event.model';
import {Choice} from '../../model/choice.model';

export class ChoiceCreatedEvent implements Event
{
  private choice: Choice;

  constructor(choice: Choice)
  {
    this.choice = choice;
  }

  public getChoice(): Choice
  {
    return this.choice;
  }
}

export class ChoiceUpdatedEvent implements Event
{
  private choice: Choice;

  constructor(choice: Choice)
  {
    this.choice = choice;
  }

  public getChoice(): Choice
  {
    return this.choice;
  }
}

export class ChoiceDeletedEvent implements Event
{
  private choiceId: string;

  constructor(choiceId: string)
  {
    this.choiceId = choiceId;
  }

  public getChoiceId(): string
  {
    return this.choiceId;
  }
}

export class ChoiceEventListener implements EventListener
{
  private onCreated: ((event: ChoiceCreatedEvent) => void);
  private onDeleted: ((event: ChoiceDeletedEvent) => void);
  private onUpdated: ((event: ChoiceUpdatedEvent) => void);

  constructor(onCreated: ((event: ChoiceCreatedEvent) => void), onDeleted: ((event: ChoiceDeletedEvent) => void), onUpdated: ((event: ChoiceUpdatedEvent) => void))
  {
    this.onCreated = onCreated;
    this.onDeleted = onDeleted;
    this.onUpdated = onUpdated;
  }

  public handle(event: Event): void
  {
    if(event instanceof ChoiceCreatedEvent)
      this.onCreated.call(this, event);

    if(event instanceof ChoiceDeletedEvent)
      this.onDeleted.call(this, event);
    if(event instanceof ChoiceUpdatedEvent)
      this.onUpdated.call(this, event);
  }
}
