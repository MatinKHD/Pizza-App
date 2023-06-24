import * as fromToppings from './toppings.action';

describe('Toppings Action', () => {
  describe('Load Toppings Action', () => {
    describe('Load Toppings', () => {
      it('should create action', () => {
        const action = fromToppings.loadToppings();
        expect({ ...action }).toEqual({
          type: fromToppings.LOAD_TOPPINGS,
        });
      });
    });
    describe('Load Toppings Fail', () => {
      it('should create action', () => {
        const payload = { message: 'Error' };
        const action = fromToppings.loadToppingsFail({ payload });
        expect({ ...action }).toEqual({
          type: fromToppings.LOAD_TOPPINGS_FAIL,
          payload,
        });
      });
    });
    describe('Load Toppings Success', () => {
      it('should create action', () => {
        const payload = [
          {
            id: 1,
            name: 'anchovy',
          },
        ];
        const action = fromToppings.loadToppingsSuccess({ payload });
        expect({ ...action }).toEqual({
          type: fromToppings.LOAD_TOPPINGS_SUCCESS,
          payload,
        });
      });
    });
  });
  describe('Visualise Toppings Action', () => {
    describe('Visualise Toppings', () => {
      it('should create action', () => {
        const payload = [1, 2, 3];
        const action = fromToppings.visualiseToppings({ payload });

        expect({ ...action }).toEqual({
          type: fromToppings.VISUALISE_TOPPINGS,
          payload,
        });
      });
    });
  });
});
