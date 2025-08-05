import { Component, computed, model, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../models/todo.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-todo-detail',
  standalone: false,
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css',
})
export class TodoDetailComponent implements OnInit {
  currentFruit = new FormControl('');
  selectedFruits: Contact[] = [];
  allFruits: Contact[] = [];
  filteredFruits: Contact[] = [];

  todo!: Todo;
  formGroup!: FormGroup;

  listPriority = [
    { text: '1', value: '1' },
    { text: '2', value: '2' },
    { text: '3', value: '3' },
  ];

  constructor(
    private todoService: TodoService,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {}
  ngOnInit(): void {
    //je recupere le Id de mon URL et je le converti au nombre
    //pour faire appel au fetch by ID du service CRUD
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.contactService.getAll().subscribe((contacts) => {
      this.allFruits = contacts;
      this.filteredFruits = [...this.allFruits];

      //appel au service pour recuperer le todo
      this.todoService.getTodo(id).subscribe((todo) => {
        this.todo = todo;

        this.formGroup = this.fb.group({
          id: [this.todo.id],
          title: [this.todo.title, Validators.required],
          completed: [this.todo.completed],
          priority: [this.todo.priority],
          dueDate: [this.todo.dueDate],
          description: [this.todo.description],
          memberIds: [this.todo.memberIds || []],
        });

        this.selectedFruits = this.allFruits.filter((c) =>
          this.todo.memberIds.includes(c.id)
        );
      });
    });
    //initaliser le formulaire avec les valeurs du todo
    //this.formGroup = this.fb...
  }

  onSubmit() {
    if (this.formGroup.value.dueDate)
      this.formGroup.value.dueDate = this.toLocalIsoString(
        this.formGroup.value.dueDate
      );

    this.formGroup
      .get('memberIds')
      ?.setValue(this.selectedFruits.map((c) => c.id));

    //tester si formulaire valide
    if (this.formGroup.valid) {
      //faire appel au update du service CRUD
      this.todoService.updateTodo(this.formGroup.value).subscribe((data) => {
        //afficher message popup
        this.snackbar.open('Updated!', '', { duration: 1000 });

        //revenir sur la liste initiale apres sauvegarde
        this.router.navigate(['/']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  toLocalIsoString(dateString: string): string {
    const dateObject = new Date(dateString);
    return new Date(
      dateObject.getTime() - dateObject.getTimezoneOffset() * 60000
    ).toISOString();
  }

  remove(fruit: number | null): void {
    if (fruit !== null) {
      this.selectedFruits = this.selectedFruits.filter(
        (f: Contact) => f.id !== fruit
      );
    }
  }
  onCurrentFruitChange(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredFruits = this.allFruits.filter((fruit) =>
      fruit.name?.toLowerCase().includes(filterValue)
    );
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let selectedContact = this.allFruits.find(
      (c) => c.id == event.option.value
    );
    if (selectedContact != null) {
      this.selectedFruits = [...this.selectedFruits, selectedContact];
      this.currentFruit.setValue('');
      event.option.deselect();
    }
  }
}
