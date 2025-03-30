import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/data-access/auth.service';
import { NotesService } from '../../../data/data-access/data-access.service';
import { Horarios } from '../../../interface/horarios';
import { SALAS_has_horario } from '../../../interface/SALAS_has_horario';

@Component({
  selector: 'app-horarios',
  imports: [],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.css'
})
export class HorariosComponent {
  salahorario: SALAS_has_horario[] = [];
  horarios: Horarios[] =[];

  constructor(private supabaseService: NotesService) {}
/* 
  ngOnInit() {
    this.cargarHorarios(1); // Reemplaza con el idProyeccion deseado
  } */

  async cargarHorarios(idProyeccion: number) {
    this.salahorario = await this.supabaseService.obtenerSalasYHorarios(idProyeccion);
    console.log(this.salahorario);
    
    this.salahorario.forEach(element => {
      element.horario_idhorario
    });
  }
}
