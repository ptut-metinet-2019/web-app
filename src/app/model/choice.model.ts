export class Choice{
  private _id;
  private title: string;
  private goodChoice: boolean;


  constructor(id, title: string, goodChoice: boolean) {
    this._id = id;
    this.title = title;
    this.goodChoice = goodChoice;
  }

  getId() {
    return this._id;
  }

  getTitle(): string{
    return this.title;
  }

  getGoodChoice(): boolean{
    return this.goodChoice;
  }
}
