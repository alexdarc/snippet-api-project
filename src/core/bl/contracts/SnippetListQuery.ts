import { SnippetItemModel } from '@/core/bl/contracts/models/SnippetItemModel';

export class SnippetListQuery {
  constructor(
    public limit: number,
    public offset: number) {
  }
}

export interface ISnippetListQueryHandler {
  HandleAsync(query: SnippetListQuery): Promise<SnippetItemModel[]>;
}
