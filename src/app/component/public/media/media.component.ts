import { Component, inject } from '@angular/core';
import { HeadComponent } from '../../head/head.component';
import { FooterComponent } from '../../footer/footer.component';
import { CarteleraComponent } from '../cartelera/cartelera.component';
import { DescuentoComponent } from '../descuento/descuento.component';
import { RouterLink } from '@angular/router';
import { AuthStateService } from '../../../data-access/auth-state.service';


@Component({
  selector: 'app-media',
  imports: [HeadComponent,FooterComponent,CarteleraComponent,DescuentoComponent,RouterLink],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export class MediaComponent {
  private _authState = inject(AuthStateService);
  getLogin(){
    // return this._authState.getLogin();
  }
}
