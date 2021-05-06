import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() title: string = 'No title';
  @Input() data: Object[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
