import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeadComponent } from '../../head/head.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-acerca',
  imports: [RouterLink, HeadComponent, FooterComponent],
  templateUrl: './acerca.component.html',
  styleUrl: './acerca.component.css'
})
export class AcercaComponent {

}
