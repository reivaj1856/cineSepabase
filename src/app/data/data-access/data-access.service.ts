import { computed, inject, Injectable, signal } from "@angular/core";
import { AuthService } from "../../auth/data-access/auth.service";
import { AuthStateService } from "../../data-access/auth-state.service";
import { Proyeccion } from "../../interface/Proyeccion";
import { Pelicula } from "../../interface/Pelicula";

interface PeliculaState{
    notes: Pelicula[];
    loading: boolean;
    error: boolean;
}

@Injectable({ providedIn: 'root'})
    export class NotesService {
        private _supabaseClient = inject(AuthStateService).supabaseClient;

        private _state = signal<PeliculaState>({
            notes:[],
            loading: false,
            error: false,
        });


    notes = computed(() => this._state().notes);
    loading = computed(() => this._state().loading);
    error = computed(() => this._state().error);
        
    async getAllNotes(){

        try {
            this._state.update((state => ({
                ...state,
                loading: true,
            })));
            const {data} = await this._supabaseClient.from('PELICULAS').select().returns<Pelicula[]>();
            if(data){
                this._state.update((state) =>({
                    ...state,
                    notes: data,
                }))
            }
        } catch (error) {
            this._state.update((state => ({
                ...state,
                error: true,
            })));
        }finally{
            this._state.update((state => ({
                ...state,
                loading: false,
            })));
        }
            
        }
    
    }
