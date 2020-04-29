import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudComponent } from './livro/crud/crud.component';
import { ListagemComponent } from './livro/listagem/listagem.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LivroModule } from './livro/livro.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LivroModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    RouterModule.forRoot([
      {
        path: '', redirectTo: 'livros', pathMatch: 'full'
      }
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
