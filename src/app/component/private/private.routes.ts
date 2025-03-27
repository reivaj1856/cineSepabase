import { Routes } from "@angular/router";

export default [
    {
        path: 'venta',
        loadComponent: () => import('./venta/venta.component').then(m => m.VentaComponent),
    },
    {
        path: 'detalles',
        loadComponent: () => import('./metodo-pago/metodo-pago.component').then(m => m.MetodoPagoComponent),
    },
   
] as Routes;
