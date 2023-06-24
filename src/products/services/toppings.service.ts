import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Topping } from '../models/toppings.model';
@Injectable()
export class ToppingsService {
  api: string = 'http://localhost:3000/toppings';

  constructor(private http: HttpClient) {}

  getToppings() {
    return this.http.get<Topping[]>(this.api);
  }
}
