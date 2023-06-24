import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { Pizza } from 'src/products/models/pizza.model';

@Component({
  selector: 'pizza-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('test', [
      transition(':enter', [
        style({ transform: 'translateY(-100px)', opcacity: 0 }),
        animate(
          '2000ms ease-out',
          style({ transform: 'translateY(0)', opactiy: 1 })
        ),
      ]),
    ]),
  ],
  styleUrls: ['./pizza-item.component.scss'],
  template: `
    <div class="pizza-item" @test>
      <a [routerLink]="['/products', pizza.id]">
        <pizza-display [pizza]="pizza"></pizza-display>
        <h4>{{ pizza.name }}</h4>
        <button type="button" class="btn btn_ok">View Pizza</button>
      </a>
    </div>
  `,
})
export class PizzaItemComponent {
  @Input() pizza!: Pizza;
}
