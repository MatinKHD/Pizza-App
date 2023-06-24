import { PizzasGuard } from './pizzas.guard';
import { ToppingsGuard } from './toppings.guard';
import { PizzaExistGuard } from './pizza-exist.guard';

export const guards: any[] = [PizzasGuard, ToppingsGuard, PizzaExistGuard];

export * from './pizzas.guard';
export * from './toppings.guard';
export * from './pizza-exist.guard';
