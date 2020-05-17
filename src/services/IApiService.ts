import { Snippet } from '@/models/Snippet';

export interface IApiService {
  list(limit: number, offset: number): Promise<Snippet[]>;

  get(id: string): Promise<Snippet>;

  create(snippet: Snippet): Promise<Snippet>;

  update(snippet: Snippet): Promise<Snippet>;

  delete(id: string): Promise<void>;
}
