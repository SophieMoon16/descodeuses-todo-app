import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root',
})

// API virtuelle mock
// 'InMemory' cad donnees initialise avec chaque demarrage

//prerequis en terminal:
//npm i angular-in-memory-web-api@0.19.0
//ng g service in-memory-data
export class InMemoryDataService implements InMemoryDataService {
  constructor() {}

  createDb() {
    /*     const todos : Todo[] = [
      //Urgentes: priority = 1 Et due date = Aujourd'hui
      {id:1, title:'Appeler Secu', completed: false, priority:'1', dueDate:new Date(2025,5,10).toISOString(), description:null},

      //A faire aujourd'hui: due date = Aujourd'hui
      {id:2, title:'Envoyer email', completed: false, priority:null, dueDate:new Date(2025,5,10).toISOString(), description: null},

      //Tache en retard: due date < Aujourd'hui
      {id:3, title:'Declaration impot', completed: false, priority:null, dueDate:new Date(2025,5,1).toISOString(), description:null},

      //Tache en retard: due date < Aujourd'hui
      {id:4, title:'Envoyer CV', completed: false, priority:null, dueDate:new Date(2025,5,2).toISOString(), description: null},
    ]; */
    const todos: Todo[] = [];

    const utilisateurs: Utilisateur[] = [
      { id: 1, firstName: 'Marie', lastName: 'Curie', genre: 'Femme' },
      { id: 2, firstName: 'Marie 2', lastName: 'Curie 2', genre: 'Femme' },
    ];

    return { todos, utilisateurs }; // un lien endpoint api/todos
  }
}
