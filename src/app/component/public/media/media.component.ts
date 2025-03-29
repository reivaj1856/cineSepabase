import { AfterViewInit, Component, inject } from '@angular/core';
import { HeadComponent } from '../../head/head.component';
import { FooterComponent } from '../../footer/footer.component';
import { CarteleraComponent } from '../cartelera/cartelera.component';
import { DescuentoComponent } from '../descuento/descuento.component';

import { AuthStateService } from '../../../data-access/auth-state.service';
import { RouterLink } from '@angular/router';
import { NotesService } from '../../../data/data-access/data-access.service';


@Component({
  selector: 'app-media',
  imports: [HeadComponent,FooterComponent,CarteleraComponent,DescuentoComponent,RouterLink],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export class MediaComponent {
 
}
