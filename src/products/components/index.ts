import { PizzaItemComponent } from './pizza-item/pizza-item.component';
import { PizzaDisplayComponent } from './pizza-display/pizza-display.component';
import { PizzaFormComponent } from './pizza-form/pizza-form.component';
import { PizzaToppingsComponent } from './pizza-toppings/pizza-toppings.component';

export const components: any[] = [
  PizzaItemComponent,
  PizzaDisplayComponent,
  PizzaFormComponent,
  PizzaToppingsComponent,
];

export * from './pizza-display/pizza-display.component';
export * from './pizza-form/pizza-form.component';
export * from './pizza-item/pizza-item.component';
export * from './pizza-toppings/pizza-toppings.component';
