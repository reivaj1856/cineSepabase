import { Component, OnInit } from '@angular/core';
import { HeadComponent } from '../../head/head.component';
import { FooterComponent } from '../../footer/footer.component';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-venta',
  imports: [HeadComponent, FooterComponent, RouterLink],
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit{
  isClicked = new Array(24).fill(false); // Asumiendo 20 asientos
  isConfirmed = new Array(24).fill(false); // Asumiendo 20 asientos
  
  proyeccionId!: string;
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.proyeccionId = params['id']; // Obtén el ID desde los parámetros de la ruta
});
  }
  toggleColor(index: number) {
    if (!this.isConfirmed[index]) {
      this.isClicked[index] = !this.isClicked[index];
    }
  }

  confirmSelection() {
    for (let i = 0; i < this.isClicked.length; i++) {
      if (this.isClicked[i]) {
        this.isConfirmed[i] = true;
        this.isClicked[i] = false;
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