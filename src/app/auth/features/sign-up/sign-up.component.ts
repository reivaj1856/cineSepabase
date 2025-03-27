import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormSignUp } from '../../../interface/FormSignUp';
import { HeadComponent } from '../../../component/head/head.component';
import { FooterComponent } from '../../../component/footer/footer.component';
import { hasEmailError, isRequired } from '../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, HeadComponent, FooterComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export default class SignUpComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  hasEmailRequired() {
    return hasEmailError(this.form);
  }

  isRequired(field: 'email' | 'password' ) {
    return isRequired(field, this.form);
  }

  form: FormGroup = this._formBuilder.group<FormSignUp>({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.control('', Validators.required),
  });

  async submit() {
    if (this.form.invalid) return;
    try {
      
    const {error,data} = await this._authService.signUp({

      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
    
    });
    if(error)throw error
      toast.success('por favor verifica tu correo');
      this._router.navigateByUrl('/auth/login');
    console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}
