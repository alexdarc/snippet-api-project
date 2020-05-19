import { SnippetItemModel } from '@/core/bl/contracts/models/SnippetItemModel';

export class CreateSnippetQuery {
  constructor(
    public content: string,
    public description: string) {
  }
}

export interface ICreateSnippetQueryHandler {
  HandleAsync(query: CreateSnippetQuery): Promise<SnippetItemModel>;
}
