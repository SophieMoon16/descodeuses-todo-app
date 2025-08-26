import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  todos: Todo[] = [];

  //KPI
  //KeyPerformanceIndicators
  //Indicateur de performances clés
  //Comme un tableau de voitures: essence, huile, temperature..

  kpis = [
    {
      id: 1,
      title: "A faire aujourdh'ui",
      color: '!bg-blue-500',
      value: 0,
      icon: 'event',
    },
    {
      id: 2,
      title: 'Taches en retard',
      color: '!bg-red-500',
      value: 0,
      icon: 'warning',
    },
    {
      id: 3,
      title: 'Urgentes',
      color: '!bg-yellow-500',
      value: 0,
      icon: 'priority_high',
    },
  ];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchTodo();
  }

  fetchTodo() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;

      // Date du jour (sans les heures)
      let today = new Date();
      today.setHours(0, 0, 0, 0);

      let countUrgent = 0,
        countToday = 0,
        countLate = 0;

      this.todos.forEach((todo) => {
        let due = new Date(todo.dueDate);
        due.setHours(0, 0, 0, 0);

        // Urgentes : priorité = 1 et date = aujourd'hui
        if (Number(todo.priority) === 1 && due.getTime() === today.getTime()) {
          countUrgent++;
        }

        // A faire aujourd'hui
        if (due.getTime() === today.getTime()) {
          countToday++;
        }

        // En retard : date passée
        if (due.getTime() < today.getTime()) {
          countLate++;
        }
      });

      this.kpis[0].value = countToday;
      this.kpis[1].value = countLate;
      this.kpis[2].value = countUrgent;
    });
  }
}
