import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliderComponent } from './slider/slider.component';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [
    SliderComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SliderComponent,
    CardComponent
  ]
})
export class ComponentsModule { }
