import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Livro } from '../livro';
import { LivroService } from '../livro.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
 

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  colunas = ['codigo', 'nome', 'preco', 'paginas', 'categoria.nome', 'editar', 'deletar'];
  livros = new MatTableDataSource();

  constructor(private livroService: LivroService) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.index();
    this.livros.sort = this.sort;

    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.nextPageLabel = 'Próxima página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator.pageSize = 10;
    
    this.livros.paginator = this.paginator;
  }

  index(): void {
    this.livroService.buscarTudo().subscribe({
      next: livros => {
        this.livros.data = livros;
      },
      error: err => {
        console.log('Error', err);
      }
    });
  }

  deletarPorId(id: number): void {
    this.livroService.deletarPorId(id).subscribe({
      next: res => {
        console.log(id + " Excluido com sucesso!");
        this.index();
      },
      error: err => {
        console.log("Error ", err);
      }
    });

  }
}
 