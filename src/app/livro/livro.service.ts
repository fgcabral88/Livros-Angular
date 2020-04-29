import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from './livro';
import { LivroRequest } from './livro-request';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private livroUrl: string = "http://localhost:8080/livro";
  private httOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Basic dHJpbGhhLWphdmE6RGVhbEAyMDIw',
    })
  }

  constructor(private httpClient: HttpClient) { }

  buscarTudo(): Observable<Livro[]> {
    return this.httpClient.get<Livro[]>(this.livroUrl, this.httOptions);
  }

  buscarPorId(id: number): Observable<Livro> {
    return this.httpClient.get<Livro>(`${this.livroUrl}/${id}`, this.httOptions);
  }

  salvar(livro: LivroRequest, livroId?: number): Observable<Livro> {
    if(!livroId) {
      return this.httpClient.post<Livro>(this.livroUrl, livro, this.httOptions);
    }
    return this.httpClient.put<Livro>(`${this.livroUrl}/${livroId}`, livro, this.httOptions);
  }

  deletarPorId(id: number): Observable<any> {
    return this.httpClient.delete(`${this.livroUrl}/${id}`, this.httOptions);
  }

}