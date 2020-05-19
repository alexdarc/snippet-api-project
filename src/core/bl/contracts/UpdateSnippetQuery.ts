import { SnippetItemModel } from '@/core/bl/contracts/models/SnippetItemModel';

export class UpdateSnippetQuery {
  constructor(
    public id: string,
    public content: string,
    public description: string) {
  }
}

export interface IUpdateSnippetQueryHandler {
  HandleAsync(query: UpdateSnippetQuery): Promise<SnippetItemModel>;
}
