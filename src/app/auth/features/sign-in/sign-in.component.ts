import { Component, inject } from '@angular/core';
import { HeadComponent } from "../../../component/head/head.component";
import { FooterComponent } from '../../../component/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { hasEmailError, isRequired } from '../utils/validators';
import { FormSignIn } from '../../../interface/FormSignIn';
import { GoogleComponent } from '../../google/google.component';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule,HeadComponent,FooterComponent,GoogleComponent,RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export default class SignInComponent {
  private _formBuilder = inject(FormBuilder);
    private _authService = inject(AuthService);
    private _router = inject(Router);
  
    hasEmailRequired() {
      return hasEmailError(this.form);
    }
  
    isRequired(field: 'email' | 'password' ) {
      return isRequired(field, this.form);
    }
  
    form: FormGroup = this._formBuilder.group<FormSignIn>({
      email: this._formBuilder.control('', [Validators.required, Validators.email]),
      password: this._formBuilder.control('', Validators.required),
    });
  
    async submit() {
      if (this.form.invalid) return;
      try {
        
      const authResponse = await this._authService.logIn({
  
        email: this.form.value.email ?? '',
        password: this.form.value.password ?? '',
      });
      if(authResponse.error){
        toast.info('Verifica tu correo para continuar');
        throw authResponse.error;
        
      }else{
        toast.success('Bienvenido a Migueplex');
        this._router.navigateByUrl('/content/media');
      }
      } catch (error) {
        console.error(error);
      }

    }
}

