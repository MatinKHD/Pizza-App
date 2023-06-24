import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import { Observable } from 'rxjs';

import { Pizza } from 'src/products/models/pizza.model';

@Component({
  selector: 'products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./products.component.scss'],
  template: `
    <div class="products">
      <div class="products_new">
        <a class="btn btn_ok" routerLink="./new"> new Pizza </a>
      </div>
      <div class="products_list">
        <div *ngIf="!(pizzas$ | async)?.length">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of pizzas$ | async"
          [pizza]="pizza"
        ></pizza-item>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  pizzas$!: Observable<Pizza[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.pizzas$ = this.store.select(fromStore.getAllPizzas);
  }
}
