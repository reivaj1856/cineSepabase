import { computed, inject, Injectable, signal } from "@angular/core";
import { AuthService } from "../../auth/data-access/auth.service";
import { AuthStateService } from "../../data-access/auth-state.service";
import { Proyeccion } from "../../interface/Proyeccion";
import { Pelicula } from "../../interface/Pelicula";
import { Horario } from "../../interface/horarios";
import { Dia } from "../../interface/Dia";
import { Sala } from "../../interface/Sala";

interface PeliculaState{
    notes: Pelicula[];
    loading: boolean;
    error: boolean;
}

interface HorarioState {
  note: Horario | null;
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

        async obtenerProyecciones(idPelicula:number) {
            const { data, error } = await this._supabaseClient
              .from('Proyeccion')
              .select('id, Horario ,idPelicula, Dia, idSala, Butacas')
              .eq('idPelicula', idPelicula);
            
            if (error) {
              console.error("Error al obtener las proyecciones:", error);
              return null;
            } else {
              return data;  // Devuelve las proyecciones encontradas
            }
          }

          async obtenerSala(){

            const { data, error } = await this._supabaseClient
              .from('Sala')
              .select('*').returns<Sala[]>()
              // Esta función hace que Supabase devuelva solo un objeto en lugar de un array
          
            if (error) {
              console.error("Error al obtener el sala:", error);
              return null;
            }
          
            return data;  // Devuelve un objeto Horario o null si no se encuentra
          }       
        }
      

