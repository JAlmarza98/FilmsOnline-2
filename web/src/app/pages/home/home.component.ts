import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { category } from 'src/app/models/categories.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public categorias: category[];
  public cargando: boolean = false;

  miLista=[
    {
      title:"Mortal Kombat",
      poster:"assets/img/test/6Wdl9N6dL0Hi0T1qJLWSz6gMLbd.jpg"
    },
    {
      title:"Godzilla vs. Kong",
      poster:"assets/img/test/bnuC6hu7AB5dYW26A3o6NNLlIlE.jpg"
    },
    {
      title:"Vanquish",
      poster:"assets/img/test/AoWY1gkcNzabh229Icboa1Ff0BM.jpg"
    },
    {
      title:"Nadie",
      poster:"assets/img/test/uuFrRLw3i5cpJZMhiOjo5piZ0tj.jpg"
    },
    {
      title:"Kimetsu No Yaiba: Guardianes de la noche - Tren infinito",
      poster:"assets/img/test/3f4ETSwknZs74lmUYC7ENIMRBMP.jpg"
    },
    {
      title:"Ruega por nosotros",
      poster:"assets/img/test/hPoOn553ARmSQl0ChKTlGDvYq9x.jpg"
    }
  ]

  constructor(private movieService: MovieService) {
    this.categoriasAleatorias();
  }

  ngOnInit(): void {;
  }

  categoriasAleatorias(){
    this.cargando = true

    this.movieService.cargarCategoriasAleatoiras().subscribe( cat => {
      this.categorias = cat;
      this.cargando = false
    });

  }

}
