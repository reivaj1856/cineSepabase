import { computed, inject, Injectable, signal } from "@angular/core";
import { AuthService } from "../../auth/data-access/auth.service";
import { AuthStateService } from "../../data-access/auth-state.service";
import { Proyeccion } from "../../interface/Proyeccion";

interface ProyeccionState{
    notes: Proyeccion[];
    loading: boolean;
    error: boolean;
}

@Injectable({ providedIn: 'root'})
    export class NotesService {
        private _supabaseClient = inject(AuthStateService).supabaseClient;

        private _state = signal<ProyeccionState>({
            notes:[],
            loading: false,
            error: false,
        });


    notes = computed(() => this._state().notes);
    loading = computed(() => this._state().loading);
    error = computed(() => this._state().error);
        
    getAllNotes(){
        try {
            const response = this._supabaseClient.from('PROYECCION').select();
            console.log(response);
        } catch (error) {
            
        }
    }
    }
