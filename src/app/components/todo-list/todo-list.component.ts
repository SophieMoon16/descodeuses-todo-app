import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  formGroup: FormGroup;
  todos: Todo[] = [];

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.fetchTodo();
  }

  fetchTodo() {
    //Communication asynchrone donc il faut s'inscrire pour avoir le retour
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  onAddTodo() {
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;

      const todo: Todo = {
        id: null, //Id est genere sur le serveur pour cela il est envoye null
        title: formValue.title, //Seulement title est remplis depuis le formulaire
        completed: false,
        priority: null,
        dueDate: '',
        description: null,
      };

      this.todoService.addTodo(todo).subscribe((data) => {
        //Actualiser la liste apres l'ajout
        this.fetchTodo();
      });
    }
  }

  onDeleteTodo(id: number | null) {
    if (id == null) return;

    this.todoService.deleteTodo(id).subscribe(() => {
      this.fetchTodo();
      this.snackBar.open('Deleted !', '', { duration: 1000 });
    });
  }

  onCheckChange(event: MatCheckboxChange, todo: Todo) {
    console.log(event.checked);
    todo.completed = event.checked;

    //mettre à jour dans l'api
    this.todoService.updateTodo(todo).subscribe((data) => {
      console.log(data);
      this.snackBar.open('Updated !', '', { duration: 1000 });
    });
  }
}
