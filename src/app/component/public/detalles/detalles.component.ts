import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { HeadComponent } from '../../head/head.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalles',
  imports: [FooterComponent,HeadComponent, RouterLink],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent {

}
