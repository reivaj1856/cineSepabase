import { Component } from '@angular/core';
import { HeadComponent } from '../../head/head.component';
import { FooterComponent } from '../../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-venta',
  imports: [HeadComponent, FooterComponent, RouterLink],
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent {
  isClicked = new Array(24).fill(false); // Asumiendo 20 asientos
  isConfirmed = new Array(24).fill(false); // Asumiendo 20 asientos

  toggleColor(index: number) {
    if (!this.isConfirmed[index]) {
      this.isClicked[index] = !this.isClicked[index];
    }
  }

  confirmSelection() {
    for (let i = 0; i < this.isClicked.length; i++) {
      if (this.isClicked[i]) {
        this.isConfirmed[i] = true; // Marca la silla como confirmada
        this.isClicked[i] = false; // Resetea el estado de selección
      }
    }
  }

  // Método para obtener el estado de los asientos en un string
  getAvailableSeatsStatus(): string {
    let status = '';
    for (let i = 0; i < this.isConfirmed.length; i++) {
      if (!this.isConfirmed[i]) {
        status += `Silla ${i + 1} está disponible.\n`;
      } else {
        status += `Silla ${i + 1} no está disponible.\n`;
      }
    }
    return status;
  }
}