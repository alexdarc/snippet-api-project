export class SnippetModel {
  constructor(
    public id: string,
    public content: string,
    public description: string,
    public createDate: Date,
    public lastUpdateDate: Date,
  ) {
  }
}
