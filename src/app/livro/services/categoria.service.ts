import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from './categoria';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})

export class CategoriaService{

    private categoriaUrl: string = 'http://localhost:8080/categorias';

    constructor(private httpClient:HttpClient){}
    
    public OrdenarNome(): Observable<Categoria[]>{
        return this.httpClient.get<Categoria[]>(`${this.categoriaUrl} ? OrdenarNome=nome`,);
    }

    public salvar(categoria: Categoria): Observable<Categoria>{
        return this.httpClient.post<Categoria>(this.categoriaUrl,categoria,);
    }

}