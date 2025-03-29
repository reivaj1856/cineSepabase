import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/data-access/auth.service';



@Component({
  selector: 'app-head',
  imports: [RouterLink],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css'
})
export class HeadComponent {

  private _authState = inject(AuthService);
  private _router = inject(Router);

  async logOut(){
    await this._authState.signOut();
    this._router.navigateByUrl('/content/media');
  }


  async getLogin(){
    const {data} = await this._authState.sesion();
  return !!data.session;
  }
}
