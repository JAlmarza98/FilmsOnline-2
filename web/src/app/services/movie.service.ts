import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { movieXcat } from '../interfaces/movie_x_category.interface';
import { map } from 'rxjs/operators';

const url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor( private http: HttpClient ) { }

  cargarCategoriasAleatoiras(){
    return this.http.get<any>(`${url}/categories`).pipe(map( resp => {

      const allCat = resp.categories;
      const selectedCat = [];
      const noRepeatvalidator = [];

      for(let i = 0; i<3 ; i++){
        let rand = Math.floor(Math.random() * (allCat.length - 0)) + 0;

        if( selectedCat.length === 0 ){
          selectedCat.push(allCat[rand]);
          noRepeatvalidator.push(rand);
        }else{

          if(!noRepeatvalidator.includes(rand)){
            selectedCat.push(allCat[rand]);
            noRepeatvalidator.push(rand);
          }else{
            i--;
          }
        }
      }
      return selectedCat;
    } ));
  }

  peliculaXCategoria(catId: string){
    return this.http.get<movieXcat>(`${url}/categories/${catId}`).pipe(map(resp => resp.movies));
  }

  obtenerPoster(movieID:string){
    return this.http.get<string>(`${url}/uploads/poster/${movieID}`);
  }
}
