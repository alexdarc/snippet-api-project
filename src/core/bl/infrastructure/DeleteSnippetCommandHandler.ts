import {
  DeleteSnippetCommand,
  IDeleteSnippetCommandHandler
} from '@/core/bl/contracts/DeleteSnippetCommand';
import { ISnippetMapper } from '@/core/dal/contracts/ISnippetMapper';

export class DeleteSnippetCommandHandler
  implements IDeleteSnippetCommandHandler {
  constructor(
    private readonly snippetMapper: ISnippetMapper) {
  }

  HandleAsync(command: DeleteSnippetCommand): Promise<void> {
    return this.snippetMapper
      .delete(command.id);
  }
}
