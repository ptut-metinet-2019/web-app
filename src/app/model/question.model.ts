import {Choice} from "./choice.model";

export class Question {

  private _id: string;
  private title: string;
  private type: string;
  private timer: number;
  private anonymous: boolean;
  private created: Date;
  private updated: Date;
  private choices: Array<Choice>;
  private questionnaireId: string;

  constructor(_id: string, questionnaireId: string, title: string, type: string, timer: number, anonymous: boolean, created: Date, updated: Date, choices: Array<Choice>) {
    this._id = _id;
    this.questionnaireId = questionnaireId;
    this.title = title;
    this.timer = timer;
    this.type = type;
    this.anonymous = anonymous;
    this.created = created;
    this.updated = updated;
    this.choices = choices;
  }

  public getId() {
    return this._id;
  }

  public getTitle(): string{
    return this.title;
  }

  public getType(): string {
    return this.type;
  }

  public getTimer(): number {
    return this.timer;
  }

  public getAnonymous(): boolean {
    return this.anonymous;
  }

  public getCreated(): Date {
    return this.created;
  }

  public getUpdated(): Date {
    return this.updated;
  }

  public  getChoices(): Array<Choice> {
    return this.choices;
  }

  public setChoices(choices: Array<Choice>): void {
    this.choices = choices;
  }

  public static fromJSONObject(data: any): Question
  {
    return new Question(
      data._id,
      data.questionnaireId,
      data.title,
      data.type,
      data.timer,
      data.anonymous,
      new Date(data.created),
      new Date(data.updated),
      data.choices
      //TODO fill choices with Choice object
    );
  }

}
