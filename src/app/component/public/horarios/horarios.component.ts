import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/data-access/auth.service';
import { NotesService } from '../../../data/data-access/data-access.service';
import { Horario } from '../../../interface/horarios';
import { SALAS_has_horario } from '../../../interface/SALAS_has_horario';
import { Proyeccion } from '../../../interface/Proyeccion';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Dia } from '../../../interface/Dia';
import { Sala } from '../../../interface/Sala';
import { NgxSonnerToaster, toast } from 'ngx-sonner';


@Component({
  selector: 'app-horarios',
  imports: [RouterLink],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.css'
})
export class HorariosComponent {
  router = inject(Router);
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

  obtenerRadioSeleccionado = function() {
      var seleccionado = document.querySelector('input[name="horaSeleccionada"]:checked');

      if (seleccionado) {
          var idSeleccionado = <string>seleccionado.id;
          console.log("ID del radio seleccionado:", idSeleccionado);

          return idSeleccionado;
      } else {
          console.log("Ningún radio seleccionado");
          toast.success('Por favor seleccione un horario');
          return null;
      }
  };
  darseleccionado(){
    this.id =""+this.obtenerRadioSeleccionado();
    if(!!!this.id){  
      this.router.navigateByUrl("/private/venta/{{this.id}}")
    }
  }

}
