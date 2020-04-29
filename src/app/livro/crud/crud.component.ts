import { Component, OnInit } from '@angular/core';
import { Categoria } from '../services/categoria';
import { LivroRequest } from '../livro-request';
import { CategoriaService } from '../services/categoria.service';
import { Livro } from '../livro';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  livro: Livro = new Livro();
  id: number;
  categorias: Categoria[] = [];
  public form: FormGroup;

  constructor(private livroService: LivroService,
              private categoriaService: CategoriaService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();

    this.getCategorias();

    this.getLivroInfo();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      codigo: [ null, [
        Validators.required
      ]],
      nome: [ null, [
        Validators.required
      ]],
      preco: [ null, [
        Validators.required
      ]],
      paginas: [ null, [
        Validators.required
      ]],
      categoria: [ null, [
        Validators.required
      ]]
    })
  }

  getCategorias(): void {
    this.categoriaService.OrdenarNome().subscribe({
      next: categorias => {
        this.categorias = categorias;
      },
      error: err => {
        console.log('Erro ', err);
      }
    })
  }

  getLivroInfo(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id > 0) {
      this.livroService.buscarPorId(this.id).subscribe({
        next: livro => {
          this.livro = livro;
          this.form.setValue({
            codigo: livro.codigo,
            nome: livro.nome,
            preco: livro.preco,
            paginas: livro.paginas,
            categoria: livro.categoria
          })
        },
        error: err => {
          console.log('Error', err);
        }
      });
    }
  }

  handleSubmit(): void {
    if(this.form.valid) {

      let data = this.form.value;
      if(!data.categoria.id) {

        let foundCategoria = false;
        this.categorias.forEach(element => {
          if(element.nome === data.categoria) {
            data.categoria = element;
            foundCategoria = true;
          }
        })

        if(!foundCategoria) {
          let categoria: Categoria = {
            nome: data.categoria
          }
          this.categoriaService.salvar(categoria).subscribe({
            next: categoria => {
              data.categoria = categoria;
            },
            error: err => {
              console.log('Error ', err);
            }
          })
        }
      }

      let livroRequest: LivroRequest = {
        nome: data.nome,
        id_categoria: data.categoria.id,
        preco: data.preco,
        paginas: data.paginas,
        codigo: data.codigo
      }

      if(this.livro) {
        this.livroService.salvar(livroRequest, this.livro.id).subscribe({
          next: livro => {
            this.router.navigate(['/livros']);
          },
          error: err => {
            console.log('Error ', err);
          }
        });
      } else {
        this.livroService.salvar(livroRequest).subscribe({
          next: livro => {
            this.router.navigate(['/livros']);
          },
          error: err => {
            console.log('Error ', err);
          }
        });
      }
    }
  }

  setCategoria(categoria: Categoria): string {
    return categoria === null ? '' : categoria.nome;
  }
}
