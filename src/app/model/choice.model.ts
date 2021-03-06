export class Choice{
  private _id;
  private questionId: string;
  private title: string;
  private answer: boolean;


  constructor(id, questionId: string, title: string, answer: boolean) {
    this._id = id;
    this.questionId = questionId;
    this.title = title;
    this.answer = answer;
  }

  pp
  getId() {
    return this._id;
  }

  getTitle(): string{
    return this.title;
  }

  getAnswer(): boolean{
    return this.answer;
  }

  getQuestionId(): string {
    return this.questionId;
  }

  public static fromJSONObject(data: any): Choice
  {
    return new Choice(
      data._id,
      data.questionId,
      data.title,
      data.answer,
    );
  }
}
