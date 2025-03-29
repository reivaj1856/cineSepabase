import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStateService } from '../../../data-access/auth-state.service';
import { NotesService } from '../../../data/data-access/data-access.service';

@Component({
  selector: 'app-cartelera',
  imports: [RouterLink],
  templateUrl: './cartelera.component.html',
  styleUrl: './cartelera.component.css'
})
export class CarteleraComponent implements AfterViewInit {
  private _authState = inject(AuthStateService);

  _noteService= inject(NotesService);

  
  ngAfterViewInit() {
    this._noteService.getAllNotes();
  }
}
