import { Topping } from './toppings.model';

export interface Pizza {
  id?: number;
  name?: string;
  toppings?: Topping[];
}
