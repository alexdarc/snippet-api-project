import { SnippetItemModel } from '@/core/bl/contracts/models/SnippetItemModel';

export class SnippetItemQuery {
  constructor(
    public id: string) {
  }
}

export interface ISnippetItemQueryHandler {
  HandleAsync(query: SnippetItemQuery): Promise<SnippetItemModel>;
}
