import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../models/todo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent implements OnInit {
  todo!: Todo;
  formGroup!: FormGroup;

  listPriority = [
    { text: '1', value: '1' },
    { text: '2', value: '2' },
    { text: '3', value: '3' },
  ];

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Récupération du Todo (Action)
    this.todoService.getTodo(id).subscribe((todo) => {
      this.todo = todo;

      // Initialisation du formulaire
      this.formGroup = this.fb.group({
        id: [this.todo.id],
        title: [this.todo.title, Validators.required],
        completed: [this.todo.completed],
        priority: [this.todo.priority],
        dueDate: [this.todo.dueDate],
        description: [this.todo.description],
      });
    });
  }

  onSubmit() {
    if (this.formGroup.value.dueDate) {
      this.formGroup.value.dueDate = this.toLocalIsoString(
        this.formGroup.value.dueDate
      );
    }

    if (this.formGroup.valid) {
      this.todoService.updateTodo(this.formGroup.value).subscribe(() => {
        this.snackbar.open('Updated!', '', { duration: 1000 });
        this.router.navigate(['/']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  private toLocalIsoString(dateString: string): string {
    const dateObject = new Date(dateString);
    return new Date(
      dateObject.getTime() - dateObject.getTimezoneOffset() * 60000
    ).toISOString();
  }
}
