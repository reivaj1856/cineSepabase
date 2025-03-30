import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { HeadComponent } from '../../head/head.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthStateService } from '../../../data-access/auth-state.service';
import { NotesService } from '../../../data/data-access/data-access.service';
import { Pelicula } from '../../../interface/Pelicula';
import { HorariosComponent } from '../horarios/horarios.component';

@Component({
  selector: 'app-detalles',
  imports: [FooterComponent, HeadComponent, RouterLink,HorariosComponent],
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'] // Corregido de styleUrl a styleUrls
})
export class DetallesComponent implements OnInit {
  private _authState = inject(AuthStateService);
private _noteService = inject(NotesService);
  
selectPelicula!: Pelicula|null; // Asegúrate de inicializar correctamente
  peliculaId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
this.route.params.subscribe(params => {
      this.peliculaId = params['id']; // Obtén el ID desde los parámetros de la ruta
    this.cargarPelicula(this.peliculaId);
});
  }
  
  async cargarPelicula(id:string) {
    this.selectPelicula = await this._noteService.getPeliculaById(id); // Reemplaza '123' con el ID real
}

}
