import { SnippetModel } from '@/models/SnippetModel';

export interface ISnippetsService {
  getSnippets(limit: number, offset: number): Promise<SnippetModel[]>;
}
