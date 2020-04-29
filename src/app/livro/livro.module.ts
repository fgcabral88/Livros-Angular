import { ListagemComponent } from './listagem/listagem.component';
import { CrudComponent } from './crud/crud.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
    declarations: [
      ListagemComponent,
      CrudComponent
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatButtonModule,
      MatIconModule,
      MatTooltipModule,
      MatInputModule,
      MatAutocompleteModule,
      RouterModule.forChild([
        {
          path: 'livros', component: ListagemComponent
        },
        {
          path: 'livro', component: CrudComponent
        },
        {
          path: 'livro/:id', component: CrudComponent
        },
      ])
    ],
    exports: [
      CrudComponent,
      ListagemComponent
    ]
  })

export class LivroModule{

}