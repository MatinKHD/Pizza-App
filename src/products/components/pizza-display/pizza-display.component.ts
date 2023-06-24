import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { Pizza } from 'src/products/models/pizza.model';

export const drop = trigger('drop', [
  transition(':enter', [
    style({ transform: 'translateY(-200px)', opactiy: 0 }),
    animate(
      '200ms ease-out',
      style({ transform: 'translateY(0)', opactiy: 1 })
    ),
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)', opactiy: 1 }),
    animate(
      '200ms ease-in',
      style({ transform: 'translateY(-200px)', opactiy: 0 })
    ),
  ]),
]);

@Component({
  selector: 'pizza-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [drop],
  styleUrls: ['./pizza-display.component.scss'],
  template: `
    <div class="pizza-display">
      <div class="pizza-display_base">
        <img src="../../assets/pizza.svg" alt="base" />
        <img
          *ngFor="let topping of pizza?.toppings; index as i"
          src="../../assets/img/toppings/{{ topping?.name }}.svg"
          alt="{{ topping?.name }}"
          [style.zIndex]="i"
          class="pizza-display_topping"
          @drop
        />
      </div>
    </div>
  `,
})
export class PizzaDisplayComponent {
  @Input() pizza!: Pizza | null;
}
