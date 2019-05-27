import {Question} from "./question.model";

export class Questionnaire
{
	  private _id: string;
    private name: string;
    private timer: number;
    private autoplayTimeout: number;
    private created: Date;
    private updated: Date;
    private questions: Array<Question>;

    constructor(id: string, name: string, timer: number, autoplayTimeout: number, created: Date, updated: Date)
    {
    	this._id = id;
    	this.name = name;
    	this.timer = timer;
    	this.autoplayTimeout = autoplayTimeout;
    	this.created = created;
    	this.updated = updated;
    }

    public getId(): string
    {
        return this._id;
    }

    public getName(): string
    {
        return this.name;
    }

    public getTimer(): number
    {
        return this.timer;
    }

    public getAutoplayTimeout(): number
    {
        return this.autoplayTimeout;
    }

    public getCreated(): Date
    {
        return this.created;
    }

    public getUpdated(): Date
    {
      return this.updated;
    }

    public setQuestions(questions: Array<Question>): void
    {
      this.questions = new Array<Question>();
      for(let question of questions){
        this.questions.push(Question.fromJSONObject(question));
      }
    }

    public getQuestions(): Array<Question>
    {
      return this.questions;
    }


  public static fromJSONObject(data: any): Questionnaire
    {
        return new Questionnaire(
            data._id,
            data.name,
            data.timer,
            data.autoplayTimeout,
            new Date(data.created),
            new Date(data.updated)
        );
    }
}
