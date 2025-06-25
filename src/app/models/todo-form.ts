import { FormControl } from "@angular/forms";

//Creer un formulaire type
export interface TodoForm {
    id: FormControl<number | null>;
    title: FormControl<string | null>
    completed: FormControl<boolean | null>;
    priority: FormControl<string | null>;
    dueDate: FormControl<Date | null>;
}