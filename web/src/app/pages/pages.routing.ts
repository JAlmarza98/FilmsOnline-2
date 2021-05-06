import { Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SagasComponent } from './sagas/sagas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { PagesComponent } from './pages.component';


const routes: Routes = [
  { path:'', component:PagesComponent,canActivate:[ AuthGuard ], children:[
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'search', component: SearchComponent, data: { title: 'Search' } },
    { path: 'peliculas', component: PeliculasComponent, data: { title: 'Peliculas' } },
    { path: 'sagas', component: SagasComponent, data: { title: 'Sagas' } },
    { path: 'categorias', component: CategoriasComponent, data: { title: 'Categorias'}},
    {path:'', redirectTo:'/home', pathMatch:'full'}
  ]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule {}
