import {
  CreateSnippetQuery,
  ICreateSnippetQueryHandler
} from '@/core/bl/contracts/CreateSnippetQuery';
import { SnippetItemModel } from '@/core/bl/contracts/models/SnippetItemModel';
import { ISnippetMapper } from '@/core/dal/contracts/ISnippetMapper';
import { CreateSnippetModel } from '@/core/dal/contracts/models/CreateSnippetModel';

export class CreateSnippetQueryHandler
  implements ICreateSnippetQueryHandler {

  constructor(
    private readonly snippetMapper: ISnippetMapper) {
  }

  HandleAsync(query: CreateSnippetQuery): Promise<SnippetItemModel> {
    return this.snippetMapper
      .create(
        new CreateSnippetModel(
          query.content,
          query.description)
      ).then(
        x => new SnippetItemModel(
          x.id,
          x.description,
          x.content,
          x.createDate
        ));
  }
}
