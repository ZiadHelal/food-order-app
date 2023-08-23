import { Fragment } from 'react';
import MealSummary from './MealSummary';
import ServedMeals from './ServedMeals';

const Meals = () => {
  return (
    <Fragment>
      <MealSummary />
      <ServedMeals />
    </Fragment>
  );
};

export default Meals;
