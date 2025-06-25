import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-table',
  standalone: false,
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.css'
})
export class TodoTableComponent implements OnInit {
  todos: Todo[] = [];
  displayedColumns: string[] = ['id', 'title', 'completed', 'priority', 'dueDate', 'description'];

  constructor(private todoService : TodoService) {

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

}
