import {
  IUpdateSnippetQueryHandler,
  UpdateSnippetQuery
} from '@/core/bl/contracts/UpdateSnippetQuery';
import { ISnippetMapper } from '@/core/dal/contracts/ISnippetMapper';
import { SnippetItemModel } from '@/core/bl/contracts/models/SnippetItemModel';
import { UpdateSnippetModel } from '@/core/dal/contracts/models/UpdateSnippetModel';

export class UpdateSnippetQueryHandler
  implements IUpdateSnippetQueryHandler {

  constructor(
    private readonly snippetMapper: ISnippetMapper) {
  }

  HandleAsync(query: UpdateSnippetQuery): Promise<SnippetItemModel> {
    return this.snippetMapper
      .update(new UpdateSnippetModel(
        query.id,
        query.content,
        query.description,
      ))
      .then(x => new SnippetItemModel(
        x.id,
        x.description,
        x.content,
        x.createDate
      ));
  }

}
