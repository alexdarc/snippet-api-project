import { ISnippetListQueryHandler, SnippetListQuery } from '@/core/bl/contracts/SnippetListQuery';
import { ISnippetMapper } from '@/core/dal/contracts/ISnippetMapper';
import { SnippetItemModel } from '@/core/bl/contracts/models/SnippetItemModel';

export class SnippetListQueryHandler
  implements ISnippetListQueryHandler {

  constructor(
    private readonly snippetMapper: ISnippetMapper) {
  }

  HandleAsync(query: SnippetListQuery): Promise<SnippetItemModel[]> {
    return this.snippetMapper
      .list(query.limit, query.offset)
      .then((snippetModelList) => snippetModelList.map(
        x => new SnippetItemModel(
          x.id,
          x.description,
          x.content,
          x.createDate
        )));
  }
}
