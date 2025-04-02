import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/data-access/auth.service';
import { NotesService } from '../../../data/data-access/data-access.service';
import { Horario } from '../../../interface/horarios';
import { SALAS_has_horario } from '../../../interface/SALAS_has_horario';
import { Proyeccion } from '../../../interface/Proyeccion';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Dia } from '../../../interface/Dia';
import { Sala } from '../../../interface/Sala';

@Component({
  selector: 'app-horarios',
  imports: [RouterLink],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.css'
})
export class HorariosComponent {

  proyecciones: Proyeccion[] |null =[];
  route = inject(ActivatedRoute);
  peliculaId!: number;
  salas: Sala [] | null=[];
  id: string = '';

  constructor(private supabaseService: NotesService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
          this.peliculaId = params['id']; // Obtén el ID desde los parámetros de la ruta
          this.cargarProyeccion(this.peliculaId);
          this.cargarSala();
        });
      }

  async cargarProyeccion(id: number) {
    this.proyecciones = await this.supabaseService.obtenerProyecciones(id);
    console.log(this.proyecciones)
  }  
  async cargarSala() {
    this.salas = await this.supabaseService.obtenerSala();
    console.log(this.salas); // Espera el resultado de la promesa
  }

  obtenerRadioSeleccionado() {
    // Obtiene todos los radios con el nombre "pelicula"
    const radios = document.querySelectorAll('input[name="horaSeleccionada"]');
    
    // Busca cuál está seleccionado
    let idSeleccionado = null;
    radios.forEach(radio => {
        if (radio.ariaChecked) {
            idSeleccionado = radio.id; // Obtiene el ID del radio seleccionado
        }
    });

    if (idSeleccionado) {
        console.log("ID del radio seleccionado:", idSeleccionado);
        alert(`Seleccionado: ${idSeleccionado}`);
    } else {
        console.log("Ningún radio seleccionado");
        alert("¡No has seleccionado ninguna opción!");
    }

    this.id = ""+ idSeleccionado; // Devuelve el ID (o null si no hay selección)
}
   
}
