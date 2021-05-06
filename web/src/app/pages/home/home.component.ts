import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  miLista=[
    {
      title:"Mortal Kombat",
      img:"assets/img/test/6Wdl9N6dL0Hi0T1qJLWSz6gMLbd.jpg"
    },
    {
      title:"Godzilla vs. Kong",
      img:"assets/img/test/bnuC6hu7AB5dYW26A3o6NNLlIlE.jpg"
    },
    {
      title:"Vanquish",
      img:"assets/img/test/AoWY1gkcNzabh229Icboa1Ff0BM.jpg"
    },
    {
      title:"Nadie",
      img:"assets/img/test/uuFrRLw3i5cpJZMhiOjo5piZ0tj.jpg"
    },
    {
      title:"Kimetsu No Yaiba: Guardianes de la noche - Tren infinito",
      img:"assets/img/test/3f4ETSwknZs74lmUYC7ENIMRBMP.jpg"
    },
    {
      title:"Ruega por nosotros",
      img:"assets/img/test/hPoOn553ARmSQl0ChKTlGDvYq9x.jpg"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
