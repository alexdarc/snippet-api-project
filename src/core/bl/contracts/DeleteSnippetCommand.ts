export class DeleteSnippetCommand {
  constructor(
    public id: string) {
  }
}

export interface IDeleteSnippetCommandHandler {
  HandleAsync(command: DeleteSnippetCommand): Promise<void>;
}
