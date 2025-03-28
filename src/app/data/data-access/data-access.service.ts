import { inject, Injectable, signal } from "@angular/core";
import { AuthService } from "../../auth/data-access/auth.service";
import { AuthStateService } from "../../data-access/auth-state.service";

interface NoteState{
    notes: [any];
    loading: boolean;
    error: boolean;
}

@Injectable({ providedIn: 'root'})
    export class NotesService {
        private _supabaseClient = inject(AuthStateService).supabaseClient;

        private _state = signal<NoteState>({
            notes:[],
            loading: false,
            error: false,
        });
    
    }
