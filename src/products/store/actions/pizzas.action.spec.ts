import * as fromPizzas from './pizzas.action';

describe('Pizzas Action', () => {
  describe('Load Pizzas Actions', () => {
    describe('Load Pizzas', () => {
      it('should create action', () => {
        const action = fromPizzas.loadPizzas();

        expect({ ...action }).toEqual({
          type: fromPizzas.LOAD_PIZZAS,
        });
      });
    });
    describe('Load Pizzas Fail', () => {
      it('should create action', () => {
        const payload = { message: 'Error' };
        const action = fromPizzas.loadPizzasFail({ payload });

        expect({ ...action }).toEqual({
          type: fromPizzas.LOAD_PIZZAS_FAIL,
          payload,
        });
      });
    });
    describe('Load Pizzas Success', () => {
      it('should create action', () => {
        const payload = [
          {
            name: "Blazin' Inferno",
            toppings: [
              {
                id: 10,
                name: 'pepperoni',
              },
            ],
            id: 1,
          },
        ];
        const action = fromPizzas.loadPizzasSuccess({ payload });

        expect({ ...action }).toEqual({
          type: fromPizzas.LOAD_PIZZAS_SUCCESS,
          payload,
        });
      });
    });
  });
  describe('Create Pizza Actions', () => {
    describe('Create Pizza', () => {
      it('should create action', () => {
        const payload = {
          name: "Blazin' Inferno",
          toppings: [
            {
              id: 10,
              name: 'pepperoni',
            },
          ],
          id: 1,
        };
        const action = fromPizzas.createPizza({ payload });

        expect({ ...action }).toEqual({
          type: fromPizzas.CREATE_PIZZA,
          payload,
        });
      });
    });
    describe('Create Pizza Fail', () => {
      it('should create action', () => {
        const payload = { message: 'Error' };
        const action = fromPizzas.createPizzaFail({ payload });

        expect({ ...action }).toEqual({
          type: fromPizzas.CREATE_PIZZA_FAIL,
          payload,
        });
      });
    });
    describe('Create Pizza Success', () => {
      it('should create action', () => {
        const payload = {
          name: "Blazin' Inferno",
          toppings: [
            {
              id: 10,
              name: 'pepperoni',
            },
          ],
          id: 1,
        };
        const action = fromPizzas.createPizzaSuccess({ payload });

        expect({ ...action }).toEqual({
          type: fromPizzas.CREATE_PIZZA_SUCCESS,
          payload,
        });
      });
    });
  });
  describe('Update Pizza Actions', () => {
    describe('Update Pizza', () => {
      it('should create action', () => {
        const payload = {
          name: "Blazin' Inferno",
          toppings: [
            {
              id: 10,
              name: 'pepperoni',
            },
          ],
          id: 1,
        };
        const action = fromPizzas.updatePizza({ payload });

        expect({ ...action }).toEqual({
          type: fromPizzas.UPDATE_PIZZA,
          payload,
        });
      });
    });
    describe('Update Pizza Fail', () => {
      it('should create action', () => {
        const payload = { message: 'Error' };
        const action = fromPizzas.updatePizzaFail({ payload });

        expect({ ...action }).toEqual({
          type: fromPizzas.UPDATE_PIZZA_FAIL,
          payload,
        });
      });
    });
    describe('Update Pizza Success', () => {
      it('should create action', () => {
        const payload = {
          name: "Blazin' Inferno",
          toppings: [
            {
              id: 10,
              name: 'pepperoni',
            },
          ],
          id: 1,
        };
        const action = fromPizzas.updatePizzaSuccess({ payload });

        expect({ ...action }).toEqual({
          type: fromPizzas.UPDATE_PIZZA_SUCCESS,
          payload,
        });
      });
    });
  });
  describe('Remove Pizza Actions', () => {
    describe('Remove Pizza', () => {
      it('should create action', () => {
        const payload = {
          name: "Blazin' Inferno",
          toppings: [
            {
              id: 10,
              name: 'pepperoni',
            },
          ],
          id: 1,
        };
        const action = fromPizzas.removePizza({ payload });

        expect({ ...action }).toEqual({
          type: fromPizzas.REMOVE_PIZZA,
          payload,
        });
      });
    });
    describe('Remove Pizza Fail', () => {
      it('should create action', () => {
        const payload = { message: 'Error' };
        const action = fromPizzas.removePizzaFail({ payload });

        expect({ ...action }).toEqual({
          type: fromPizzas.REMOVE_PIZZA_FAIL,
          payload,
        });
      });
    });
    describe('Remove Pizza Success', () => {
      it('should create action', () => {
        const payload = {
          name: "Blazin' Inferno",
          toppings: [
            {
              id: 10,
              name: 'pepperoni',
            },
          ],
          id: 1,
        };
        const action = fromPizzas.removePizaaSuccess({ payload });

        expect({ ...action }).toEqual({
          type: fromPizzas.REMOVE_PIZZA_SUCCESS,
          payload,
        });
      });
    });
  });
});
