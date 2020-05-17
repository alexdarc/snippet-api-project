import { SnippetModel } from '@/models/SnippetModel';
import { ISnippetsService } from '@/services/ISnippetsService';
import { IApiService } from '@/services/IApiService';
import { Snippet } from '@/models/Snippet';

export default class SnippetsService implements ISnippetsService {
  private snippetList: SnippetModel[] = [];

  constructor(private readonly apiService: IApiService) {
  }

  getSnippets(limit: number, offset: number): Promise<SnippetModel[]> {
    if (this.snippetList.length > 0) {
      return Promise.resolve(this.snippetList);
    }

    return this.apiService.list(limit, offset)
      .then((list) => list.map(
        (x) => new SnippetModel(
          x.content,
          x.description,
        ),
      ))
      .then((list) => {
        this.snippetList = list;
        return list;
      });
  }

  addSnippet(snippetModel: SnippetModel): Promise<SnippetModel> {
    return this.apiService.create(new Snippet('', snippetModel.Content, snippetModel.Description))
      .then((snippet) => {
        const snippetModel = new SnippetModel(snippet.content, snippet.description);

        this.snippetList.push(snippetModel);
        return snippetModel;
      });
  }
}
