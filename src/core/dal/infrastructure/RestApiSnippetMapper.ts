import axios, { AxiosInstance } from 'axios';
import { ISnippetMapper } from '@/core/dal/contracts/ISnippetMapper';
import { CreateSnippetModel } from '@/core/dal/contracts/models/CreateSnippetModel';
import { UpdateSnippetModel } from '@/core/dal/contracts/models/UpdateSnippetModel';
import { SnippetModel } from '@/core/dal/contracts/models/SnippetModel';

export class RestApiSnippetMapper implements ISnippetMapper {
  private http: AxiosInstance;

  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  }

  create(snippet: CreateSnippetModel): Promise<SnippetModel> {
    return this.http.post('snippets', snippet)
      .then(response => response.data);
  }

  delete(id: string): Promise<void> {
    return this.http.delete(`snippets/${id}`)
      .then(response => response.data);
  }

  get(id: string): Promise<SnippetModel> {
    return this.http.get(`snippets/${id}`)
      .then(response => response.data);
  }

  list(limit: number, offset: number): Promise<SnippetModel[]> {
    return this.http.get('snippets')
      .then(response => response.data);
  }

  update(snippet: UpdateSnippetModel): Promise<SnippetModel> {
    return this.http.put(`snippets/${snippet.id}`, snippet)
      .then(response => response.data);
  }
}
