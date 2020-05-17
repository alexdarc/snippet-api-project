import { SnippetModel } from '@/models/SnippetModel';
import { ISnippetsService } from '@/services/ISnippetsService';
import { IApiService } from '@/services/IApiService';

export default class SnippetsService implements ISnippetsService {
  constructor(private readonly apiService: IApiService) {
  }

  getSnippets(limit: number, offset: number): Promise<SnippetModel[]> {
    return this.apiService.list(limit, offset)
      .then((list) => list.map(
        (x) => new SnippetModel(
          x.content,
          x.description,
        ),
      ));
  }
}
