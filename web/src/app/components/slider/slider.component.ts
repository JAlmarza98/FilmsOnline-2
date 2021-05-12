import { Component, OnInit, Input } from '@angular/core';
import { movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() title: string = 'No title';
  @Input() data: string;

  public items: movie[];


  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.peliculasXCategoria(this.data);

  }

  peliculasXCategoria(data){
    this.movieService.peliculaXCategoria(data).subscribe( resp => {
      this.items = resp;
    })
  }

}
