import { ISnippetItemQueryHandler, SnippetItemQuery } from '@/core/bl/contracts/SnippetItemQuery';
import { ISnippetMapper } from '../../dal/contracts/ISnippetMapper';
import { SnippetItemModel } from '../contracts/models/SnippetItemModel';

export class SnippetItemQueryHandler
  implements ISnippetItemQueryHandler {

  constructor(
    private readonly snippetMapper: ISnippetMapper) {
  }

  HandleAsync(query: SnippetItemQuery): Promise<SnippetItemModel> {
    return this.snippetMapper
      .get(query.id)
      .then(x => new SnippetItemModel(
        x.id,
        x.description,
        x.content,
        x.createDate
      ));
  }

}
