import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiURL: string = environment.apiUrl + '/api/contact';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(this.apiURL);
  }
}
