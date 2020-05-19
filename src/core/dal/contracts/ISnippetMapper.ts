import { SnippetModel } from '@/core/dal/contracts/models/SnippetModel';
import { CreateSnippetModel } from '@/core/dal/contracts/models/CreateSnippetModel';
import { UpdateSnippetModel } from '@/core/dal/contracts/models/UpdateSnippetModel';

export interface ISnippetMapper {
  list(limit: number, offset: number): Promise<SnippetModel[]>;

  get(id: string): Promise<SnippetModel>;

  create(snippet: CreateSnippetModel): Promise<SnippetModel>;

  update(snippet: UpdateSnippetModel): Promise<SnippetModel>;

  delete(id: string): Promise<void>;
}
