import { SnippetModel } from '@/models/SnippetModel';
import { UpdateServiceSnippetModel } from '@/services/SnippetsService/UpdateServiceSnippetModel';
import { AddServiceSnippetModel } from '@/services/SnippetsService/AddServiceSnippetModel';

export interface ISnippetsService {
  getSnippets(limit: number, offset: number): Promise<SnippetModel[]>;

  addSnippet(snippetModel: AddServiceSnippetModel): Promise<SnippetModel>;

  removeSnippet(id: string): void;

  getSnippet(id: string): Promise<SnippetModel>;

  updateSnippet(snippetModel: UpdateServiceSnippetModel): Promise<SnippetModel>;
}
