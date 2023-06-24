import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { effects, reducers } from './store';
import { pizzasReducers } from './store/reducers/pizzas.reducer';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

//guards
import * as fromGuards from './guards';

// services
import * as fromServices from './services';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [fromGuards.PizzasGuard],
    component: fromContainers.ProductsComponent,
  },
  {
    path: 'new',
    canActivate: [fromGuards.PizzasGuard, fromGuards.ToppingsGuard],
    component: fromContainers.ProductItemComponent,
  },
  {
    path: ':pizzaId',
    canActivate: [fromGuards.PizzaExistGuard, fromGuards.ToppingsGuard],
    component: fromContainers.ProductItemComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  providers: [...fromServices.services, ...fromGuards.guards],
  exports: [...fromContainers.containers, ...fromComponents.components],
})
export class ProductsModule {}
