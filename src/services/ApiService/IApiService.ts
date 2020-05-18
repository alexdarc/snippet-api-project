import { Snippet } from '@/models/Snippet';
import { UpdateApiSnippetModel } from '@/services/ApiService/UpdateApiSnippetModel';
import { CreateApiServiceSnippetModel } from '@/services/ApiService/CreateApiServiceSnippetModel';

export interface IApiService {
  list(limit: number, offset: number): Promise<Snippet[]>;

  get(id: string): Promise<Snippet>;

  create(snippet: CreateApiServiceSnippetModel): Promise<Snippet>;

  update(snippet: UpdateApiSnippetModel): Promise<Snippet>;

  delete(id: string): Promise<void>;
}
