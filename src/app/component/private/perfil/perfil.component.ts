import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/data-access/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
   
  private _authState = inject(AuthService);
  private _router = inject(Router);

  async logOut(){
    await this._authState.signOut();
    this._router.navigateByUrl('/content/media');
  }
}
