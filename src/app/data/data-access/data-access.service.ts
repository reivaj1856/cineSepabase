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

    peli!:Pelicula;
    notes = computed(() => this._state().notes);
    loading = computed(() => this._state().loading);
    error = computed(() => this._state().error);
        
    async getAllNotes(){

        try {
            this._state.update((state => ({
                ...state,
                loading: true,
            })));
            const {data} = await this._supabaseClient.from('Pelicula').select().returns<Pelicula[]>();
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
        
        async getPeliculaById(id: string): Promise<Pelicula | null> {
            try {
                // Consultamos la película con el ID específico
                const { data, error } = await this._supabaseClient
                    .from('Pelicula')
                    .select('*')
                    .eq('id', id)
                    .single(); // 👈 Garantiza que solo devuelva un objeto y no un array
        
                if (error) throw error; // Si hay error, lanzamos una excepción
        
                return data; // Retornamos la película encontrada
            } catch (error) {
                console.error("Error al obtener la película:", error);
                return null; // Si hay un error, devolvemos `null`
            }
        }
        async obtenerSalasYHorarios(idProyeccion: number) {
            try {
              const { data, error } = await this._supabaseClient
                .from('SALAS_has_horario')
                .select('*')
                .eq('SALAS_idSALAS', idProyeccion);
        
              if (error) throw error;
              return data;
            } catch (error) {
              console.error('Error al obtener horarios:', error);
              return [];
            }
          }
    }
