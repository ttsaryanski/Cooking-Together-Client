import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

@Component({
  selector: 'app-carusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carusel.component.html',
  styleUrl: './carusel.component.css',
})
export class CaruselComponent implements AfterViewInit {
  items = ['Slide 1', 'Slide 2', 'Slide 3'];

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper', {
      modules: [Navigation],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      loop: true,
    });
  }
}
