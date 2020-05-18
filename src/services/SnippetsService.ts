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
          x.id,
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
    return this.apiService.create(new Snippet('', snippetModel.content, snippetModel.description))
      .then((snippet) => {
        const snippetModel = new SnippetModel(snippet.id, snippet.content, snippet.description);

        this.snippetList.push(snippetModel);
        return snippetModel;
      });
  }

  removeSnippet(id: string): void {
    const snippetIndex = this.snippetList.findIndex(s => s.id === id);
    if (snippetIndex === -1) {
      return;
    }

    this.apiService.delete(id)
      .then(() => {
        this.snippetList.splice(snippetIndex, 1);
      });
  }

  getSnippet(id: string): Promise<SnippetModel> {
    const snippetModel = this.snippetList.find(s => s.id === id);
    if (snippetModel == null) {
      return Promise.reject('Not found');
    }

    return Promise.resolve(snippetModel);
  }

  updateSnippet(snippetModel: SnippetModel): Promise<SnippetModel> {
    const snippetIndex = this.snippetList.findIndex(s => s.id === snippetModel.id);
    if (snippetIndex === -1) {
      return Promise.reject('Not found');
    }

    return this.apiService.update(new Snippet(snippetModel.id, snippetModel.content, snippetModel.description))
      .then((snippet) => {
        const snippetModel = new SnippetModel(snippet.id, snippet.content, snippet.description);
        this.snippetList.splice(snippetIndex, 1, snippetModel)

        return snippetModel;
      });
  }
}
