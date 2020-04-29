import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudComponent } from './livro/crud/crud.component';
import { ListagemComponent } from './livro/listagem/listagem.component';
import { LivroModule } from './livro/livro.module';


const routes: Routes = [
  {path:'livro', component: LivroModule},
  {path: 'crud', component: CrudComponent},
  {path: 'listagem', component: ListagemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
