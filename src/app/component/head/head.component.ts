import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/data-access/auth.service';
import { PerfilComponent } from '../private/perfil/perfil.component';
import { LogComponent } from '../public/log/log.component';



@Component({
  selector: 'app-head',
  imports: [RouterLink,PerfilComponent,LogComponent],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css'
})
export class HeadComponent {

  private _authState = inject(AuthService);
  private _router = inject(Router);

  async getLogin(){
    const {data} = await this._authState.sesion();
  return !!data.session;
  }
}
