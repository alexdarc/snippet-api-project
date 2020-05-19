export class ServiceProviders {
  public static readonly ISnippetListQueryHandler = Symbol('ISnippetListQueryHandler');

  public static readonly ISnippetItemQueryHandler = Symbol('ISnippetItemQueryHandler');

  public static readonly ICreateSnippetQueryHandler = Symbol('ICreateSnippetQueryHandler');

  public static readonly IUpdateSnippetQueryHandler = Symbol('IUpdateSnippetQueryHandler');

  public static readonly IDeleteSnippetCommandHandler = Symbol('IDeleteSnippetCommandHandler');
}
