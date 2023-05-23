import { IHomeLoader } from '@/types/store-state';
import { createSlice } from '@reduxjs/toolkit';


const initialState: IHomeLoader = {
    showLoader: true, 
};

export const homeLoaderSlice = createSlice({
    name: 'homeLoader',
    initialState,
    reducers: {
        resetHomeLoader(state) {
            state.showLoader = false;
        },
    },
})

export const { resetHomeLoader } = homeLoaderSlice.actions;
export default homeLoaderSlice.reducer;