import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';

import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzasService {
  constructor(private http: HttpClient) {}

  get api() {
    return `http://localhost:3000/pizzas`;
  }

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.api);
  }

  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(`${this.api}`, payload);
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .put<Pizza>(`${this.api}/${payload.id}`, payload)
      .pipe(catchError((error) => throwError(error.json())));
  }

  removePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .delete<Pizza>(`${this.api}/${payload.id}`)
      .pipe(catchError((error) => throwError(error.json())));
  }
}
