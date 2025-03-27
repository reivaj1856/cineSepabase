
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/data-access/auth.service';

const routerInjection = () => inject(Router);

const authService = () => inject(AuthService);

export const privateGuard : CanActivateFn = async () => {
  const router = routerInjection();
  const {data} = await authService().sesion();

  console.log(data);
  if(!data.session){
    router.navigateByUrl('/auth/login')
  }

  return !!data.session;
};

export const publicGuard : CanActivateFn = async () => {
  const router = routerInjection();
  const {data} = await authService().sesion();

  console.log(data);
  if(!data.session){
    router.navigateByUrl('/content/media')
  }

  return !data.session;
};
 