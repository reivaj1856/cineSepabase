
import { Component } from '@angular/core';
import { HeadComponent } from '../../head/head.component';
import { FooterComponent } from '../../footer/footer.component';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

// 1. Define la interfaz aquí, antes de la clase
interface PaymentState {
  sillas: string[]; // Esta propiedad será un array de strings
}

@Component({
  selector: 'app-metodo-pago',
  imports: [HeadComponent, FooterComponent],
  templateUrl: './metodo-pago.component.html',
  styleUrls: ['./metodo-pago.component.css'] // Asegúrate de que esto sea 'styleUrls'
})
export class MetodoPagoComponent {
  // Propiedades para almacenar datos del formulario
  nombreTitular: string = '';
  numeroTarjeta: string = '';
  fechaExpiracion: string = '';
  cvv: string = '';

  // 2. Datos de la factura
  ticketDetails = {
    
    sillasSeleccionadas: [] as string[] // Inicializa el array de sillas seleccionadas
  };

  constructor(private router: Router) {
    // Obtiene la navegación actual
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      // Asegúrate de que el estado es del tipo PaymentState
      const state = navigation.extras.state as PaymentState;
      this.ticketDetails.sillasSeleccionadas = state.sillas || []; // Asigna las sillas seleccionadas
    }
  }

  calcularTotal() {
    // Multiplica el número de sillas seleccionadas por el precio de cada silla
    return this.ticketDetails.sillasSeleccionadas.length * 30;
  }
  generarFactura(nombreTitular: string, numeroTarjeta: string, fechaExpiracion: string, cvv: string) {
    const total = this.calcularTotal();
    const factura = `
      <h1 style="text-align: center; font-size: 24px; font-weight: bold;">FACTURA DE COMPRA</h1>
      <p><strong>Nombre del titular:</strong> ${nombreTitular}</p>
      <p><strong>Número de tarjeta:</strong> ${numeroTarjeta}</p>
      <p><strong>Fecha de expiración:</strong> ${fechaExpiracion}</p>
      <p><strong>CVV:</strong> ${cvv}</p>
      <h2>Sillas Seleccionadas:</h2>
      <ul style="list-style-type: none; padding: 0;">
        ${this.ticketDetails.sillasSeleccionadas.length > 0 
          ? this.ticketDetails.sillasSeleccionadas.map(silla => `<li>${silla}</li>`).join('') 
          : '<li>No se han seleccionado sillas.</li>'}
      </ul>
      <h2 style="font-size: 20px; font-weight: bold;">Total a Pagar: $${total.toFixed(2)}</h2>
      <p style="text-align: center;">¡Gracias por su compra!</p>
      <button onclick="window.print();" style="display: block; margin: 20px auto; padding: 10px 20px; font-size: 16px; background-color: #4CAF50; color: white; border: none; border-radius: 5px;">Imprimir</button>
    `;
  
    const nuevaVentana = window.open('', '_blank', 'width=600,height=400');
    if (nuevaVentana) {
      nuevaVentana.document.write(`
        <html>
          <head>
            <title>Factura</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #333; }
              h2 { color: #555; }
              p { font-size: 14px; line-height: 1.6; }
              ul { list-style-type: none; padding: 0; }
              strong { color: #000; }
            </style>
          </head>
          <body>
            ${factura}
          </body>
        </html>
      `);
      nuevaVentana.document.close();
    }
  }
  
}
