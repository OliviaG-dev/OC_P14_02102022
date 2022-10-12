import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../redux/features/employee';

export const store = configureStore({
    reducer: {
        employee: employeeReducer
    }
})