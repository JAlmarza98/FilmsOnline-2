import { Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SagasComponent } from './sagas/sagas.component';
import { CategoriasComponent } from './categorias/categorias.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  { path: 'search', component: SearchComponent, data: { title: 'Search' } },
  { path: 'sagas', component: SagasComponent, data: { title: 'Sagas' } },
  { path: 'categories', component: CategoriasComponent, data: { title: 'Categories'}}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule {}
