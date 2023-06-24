import {
  Component,
  ChangeDetectionStrategy,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { map } from 'rxjs';

import { Pizza } from 'src/products/models/pizza.model';
import { Topping } from 'src/products/models/toppings.model';
@Component({
  selector: 'pizza-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pizza-form">
      <from [formGroup]="form">
        <label>
          <h4>Pizza name</h4>
          <input
            type="text"
            formControlName="name"
            placeholder="e.g. Pepperoni"
            class="pizza-form_input"
            [class.error]="nameControlInvalid"
          />
          <div class="pizza-form_error" *ngIf="nameControlInvalid">
            <p>Pizza must have name</p>
          </div>
        </label>

        <ng-content></ng-content>

        <label>
          <h4>Select toppings</h4>
        </label>
        <div class="pizza-form_list">
          <pizza-toppings
            formControlName="toppings"
            [toppings]="toppings"
          ></pizza-toppings>
        </div>
        <div class="pizza-form_actions">
          <button
            type="button"
            class="btn btn_ok"
            *ngIf="!exists"
            (click)="createPizza(form)"
          >
            Create Pizza
          </button>

          <button
            type="button"
            class="btn btn_ok"
            *ngIf="exists"
            (click)="updatePizza(form)"
          >
            Save changes
          </button>

          <button
            type="button"
            class="btn btn_warning"
            *ngIf="exists"
            (click)="removePizza(form)"
          >
            Delete Pizza
          </button>
        </div>
      </from>
    </div>
  `,
})
export class PizzaFormComponent implements OnChanges {
  exists = false;

  @Input() pizza!: Pizza | null;

  @Input() toppings!: Topping[] | null;

  @Output() selected: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() create: EventEmitter<Pizza> = new EventEmitter<Pizza>();
  @Output() update: EventEmitter<Pizza> = new EventEmitter<Pizza>();
  @Output() remove: EventEmitter<Pizza> = new EventEmitter<Pizza>();

  form = this.fb.group({
    name: ['', Validators.required],
    toppings: [[]],
  });

  constructor(private fb: FormBuilder) {}

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl.hasError('required') && this.nameControl.touched;
  }

  ngOnChanges() {
    if (this.pizza && this.pizza.id) {
      this.exists = true;
      this.form.patchValue(this.pizza);
    }
    this.form
      .get('toppings')
      ?.valueChanges.pipe(
        map((toppings) => toppings.map((topping: Topping) => topping.id))
      )
      .subscribe((value) => this.selected.emit(value));
  }

  createPizza(form: FormGroup) {
    const { value, valid } = form;
    if (valid) this.create.emit(value);
  }

  updatePizza(form: FormGroup) {
    const { value, valid, touched } = form;

    if (touched && valid) this.update.emit({ ...this.pizza, ...value });
  }

  removePizza(form: FormGroup) {
    const { value } = form;

    this.remove.emit({ ...this.pizza, ...value });
  }
}
