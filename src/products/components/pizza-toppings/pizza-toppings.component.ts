import {
  Component,
  forwardRef,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Topping } from 'src/products/models/toppings.model';

const PIZZA_TOPPINGS_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PizzaToppingsComponent),
  multi: true,
};

@Component({
  selector: 'pizza-toppings',
  providers: [PIZZA_TOPPINGS_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./pizza-toppings.component.scss'],
  template: `
    <div class="pizza-toppings">
      <div
        class="pizza-toppings_item"
        *ngFor="let topping of toppings"
        (click)="selectTopping(topping)"
        [class.active]="existInToppings(topping)"
      >
        <img
          src="../../assets/img/toppings/singles/{{ topping.name }}.svg"
          alt="{{ topping.name }}"
        />
        {{ topping.name }}
      </div>
    </div>
  `,
})
export class PizzaToppingsComponent implements ControlValueAccessor {
  @Input() toppings!: Topping[] | null;

  value!: Topping[];

  private onTouch!: Function;
  private onModelChange!: Function;

  constructor() {
    // this.toppings.forEach((topping) => console.log(topping.));
  }

  writeValue(value: Topping[]): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  selectTopping(topping: Topping) {
    if (this.existInToppings(topping)) {
      this.value = this.value.filter((item) => item.id !== topping.id);
    } else {
      this.value = [...this.value, topping];
    }
    this.onTouch();
    this.onModelChange(this.value);
  }

  existInToppings(topping: Topping) {
    return this.value.some((val) => val.id === topping.id);
  }
}
