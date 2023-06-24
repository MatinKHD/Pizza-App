import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, map, tap, filter, take, switchMap } from 'rxjs';
import * as fromStore from '../store';

import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzaExistGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => this.hasPizza(parseInt(route.params['pizzaId'], 10)))
    );
  }

  hasPizza(id: number): Observable<boolean> {
    return this.store
      .select(fromStore.getPizzasEntites)
      .pipe(map((entities: { [key: number]: Pizza }) => !!entities[id]));
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded).pipe(
      tap((loaded) => {
        if (!loaded) this.store.dispatch(fromStore.loadPizzas());
      }),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
