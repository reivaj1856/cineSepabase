import { Component } from '@angular/core';
import { HeadComponent } from '../../head/head.component';
import { FooterComponent } from '../../footer/footer.component';
import { CarteleraComponent } from '../cartelera/cartelera.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeadComponent,FooterComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
