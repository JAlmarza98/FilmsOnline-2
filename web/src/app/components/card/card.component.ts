import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';

import { movie } from 'src/app/models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() movie:movie;

  public base_url = environment.base_url;
  public poster;
  public noPoster:boolean = false;

  constructor( private movieService:MovieService,protected sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.noPoster = false
    this.obtenerPosterPath();
    console.log(this.poster);
  }

  obtenerPosterPath(){

    this.movieService.obtenerPoster(this.movie._id).subscribe( resp => {
      if( resp ){
        let arrayAux = resp.split('\\');
        arrayAux = arrayAux.splice(4,arrayAux.length);

        const dirTemp = arrayAux.join('/');
        const finalURL = `${this.base_url}/${dirTemp}`;
        this.poster = this.sanitizer.bypassSecurityTrustUrl(finalURL);
      }else{
        this.noPoster = true
      }
    });
  }

}
