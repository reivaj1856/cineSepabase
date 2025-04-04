import { inject, Injectable } from '@angular/core';
import { AuthStateService } from '../../data-access/auth-state.service';
import { SignUpWithPasswordCredentials} from '@supabase/supabase-js';
import { bindCallback } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _supabaseClient = inject(AuthStateService).supabaseClient;
  
  constructor(){
    this._supabaseClient.auth.onAuthStateChange((session)=>
    {
      console.log(session);
    });
  }
  
  sesion() {
    return this._supabaseClient.auth.getSession();
  }

  signUp(credentials: SignUpWithPasswordCredentials) {
    return this._supabaseClient.auth.signUp(credentials);
  }

  logIn(credentials: SignUpWithPasswordCredentials) {
    return this._supabaseClient.auth.signInWithPassword(credentials);
  }

  signOut() {
    return this._supabaseClient.auth.signOut();
  }

  async getLogin(): Promise<boolean>{
    const { data, error } = await this._supabaseClient.auth.getSession();
  
    if (error) {
      console.log('Hubo un error al obtener la sesión:', error.message);
      return false;
    }
  
    if (data?.session) {
      console.log('Usuario está logueado.');
      return true;
    } else {
      console.log('Usuario no está logueado.');
      return false;
    }
  
  }
}
