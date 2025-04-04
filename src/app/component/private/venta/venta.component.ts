import { Component, OnInit } from '@angular/core';
import { HeadComponent } from '../../head/head.component';
import { FooterComponent } from '../../footer/footer.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NotesService } from '../../../data/data-access/data-access.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-venta',
  imports: [HeadComponent, FooterComponent, RouterLink],
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit{
  isConfirmed : boolean[] =[false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false];
  isClicked = [false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false];
  
  proyeccionId!: string;
  
  constructor(private route: ActivatedRoute,private notes :NotesService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.proyeccionId = params['id']; // Obtén el ID desde los parámetros de la ruta
    this.notes.obtenerEstadoAsientos(this.proyeccionId).then((estado) => {
      this.isConfirmed = estado;
      });
    
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
    return this.isClicked.map((confirmed, index) => confirmed ? `S - ${index + 1} ------------------------ 30bs` : null).filter(Boolean) as string[];
  }

  getConfirmed(): boolean[] {
    return this.isConfirmed;
  }

  getID(){
    return this.proyeccionId;
  }

  // Método para verificar si hay sillas seleccionadas
  hasSelectedSeats(): boolean {
    return this.getSelectedSeats().length > 0;
  }

  handlePayment() {
    if (!this.hasSelectedSeats()) {
      toast.info('Por favor selecciona un asiento');
    }else{
      this.confirmSelection();
      console.log(this.getConfirmed());
    }
  }
}