import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import * as fromStore from '../../store';

import { Pizza } from 'src/products/models/pizza.model';
import { Topping } from 'src/products/models/toppings.model';

@Component({
  selector: 'product-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)"
      >
        <pizza-display [pizza]="visualise$ | async"></pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  pizza$!: Observable<Pizza>;
  visualise$!: Observable<Pizza>;
  toppings$!: Observable<Topping[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.pizza$ = this.store.select(fromStore.getSelectedPizza).pipe(
      tap((pizza: Pizza): void => {
        const pizzaExist = !!(pizza && pizza.id);
        const toppings: number[] =
          pizzaExist && pizza.toppings
            ? pizza.toppings?.map((topping): number => topping.id as number)
            : [];
        this.store.dispatch(fromStore.visualiseToppings({ payload: toppings }));
      })
    );
    this.toppings$ = this.store.select(fromStore.getAllToppings);
    this.visualise$ = this.store.select(fromStore.getPizzaViusalised);
  }

  onSelect(event: number[]) {
    this.store.dispatch(fromStore.visualiseToppings({ payload: event }));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(fromStore.createPizza({ payload: event }));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(fromStore.updatePizza({ payload: event }));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are You Sure? ');
    if (remove) {
      this.store.dispatch(fromStore.removePizza({ payload: event }));
    }
  }
}
