import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SagasComponent } from './sagas/sagas.component';
import { CategoriasComponent } from './categorias/categorias.component';



@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    SagasComponent,
    CategoriasComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
