import { Routes } from '@angular/router';


export const routes: Routes = [
    { 
       
        path: 'auth',
        loadChildren: () => import('./auth/features/auth.routes'),
    },
    { 
        path: 'content',
        loadChildren: () => import('./component/public/public.routes'),
    },
    { 
        
        path: 'private',
        loadChildren: () => import('./component/private/private.routes'),
    },
    { 
        path: '**',
        loadChildren: () => import('./component/public/public.routes'),
    }, 
];

