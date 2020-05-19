export class SnippetItemModel {
  constructor(
    public id: string,
    public description: string,
    public content: string,
    public createdDate: Date) {
  }
}
