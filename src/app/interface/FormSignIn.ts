import { FormControl } from "@angular/forms";

export interface FormSignIn {
    email: FormControl<String | null >;
    password: FormControl<String | null >;
}
