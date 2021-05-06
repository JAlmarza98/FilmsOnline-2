import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../components/components.module';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SagasComponent } from './sagas/sagas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { PagesComponent } from './pages.component';



@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    SagasComponent,
    CategoriasComponent,
    PeliculasComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
