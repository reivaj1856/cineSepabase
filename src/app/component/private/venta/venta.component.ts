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
  isClicked = new Array(24).fill(false); // Asumiendo 24 asientos
  isConfirmed = new Array(24).fill(false); // Asumiendo 24 asientos

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

  // Método para obtener las sillas seleccionadas
  getSelectedSeats(): string[] {
    return this.isConfirmed.map((confirmed, index) => confirmed ? `S - ${index + 1} ------------------------ 30bs` : null).filter(Boolean) as string[];
  }

  // Método para verificar si hay sillas seleccionadas
  hasSelectedSeats(): boolean {
    return this.getSelectedSeats().length > 0;
  }

  handlePayment() {
    if (!this.hasSelectedSeats()) {
      alert('¡Por favor, selecciona al menos un asiento antes de continuar!');
    }
  }
}