import axios, { AxiosInstance } from 'axios';
import { IApiService } from './IApiService';
import { Snippet } from '@/models/Snippet';

export class ApiService implements IApiService {
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

  create(snippet: Snippet): Promise<Snippet> {
    return this.http.post('snippets', snippet)
      .then(response => response.data);
  }

  delete(id: string): Promise<void> {
    return this.http.delete(`snippets/${id}`)
      .then(response => response.data);
  }

  get(id: string): Promise<Snippet> {
    return this.http.get(`snippets/${id}`)
      .then(response => response.data);
  }

  list(limit: number, offset: number): Promise<Snippet[]> {
    return this.http.get('snippets')
      .then(response => response.data);
  }

  update(snippet: Snippet): Promise<Snippet> {
    return this.http.put(`snippets/${snippet.id}`, snippet)
      .then(response => response.data);
  }
}
