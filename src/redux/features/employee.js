import { createSlice } from '@reduxjs/toolkit';
import employeesMocked from '../../data/dataMockedEmployee';

export const employeeSlice = createSlice({
    name: 'employees',
    initialState: employeesMocked,
    reducers : {
        createEmployee: (state, action) => {
            const newEmployee = action.payload
            state.push(newEmployee)
        }
    }
})

export const { createEmployee } = employeeSlice.actions
export default employeeSlice.reducer