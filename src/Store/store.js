import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './Slices/coursesSlice';
import categoriesReducer from './Slices/categoriesSlice';

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    categories: categoriesReducer,
  },
});

export default store;
