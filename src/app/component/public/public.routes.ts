import { Routes } from "@angular/router";

export default [
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'media',
        loadComponent: () => import('./media/media.component').then(m => m.MediaComponent  ),
    },
    {
        path: 'acerca',
        loadComponent: () => import('./acerca/acerca.component').then(m => m.AcercaComponent),
    },
    {
        path: 'detalles/:id',
        loadComponent: () => import('./detalles/detalles.component').then(m => m.DetallesComponent),
    },
    {
        path: '**',
        loadComponent: () => import('./media/media.component').then(m => m.MediaComponent),
    },
] as Routes;
