import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Graduate {
    id: string;
    name: string;
}

export interface Career {
    id: string;
    name: string;
    graduates: Graduate[];
}

interface GraduatesState {
    careers: Career[];
}

const initialState: GraduatesState = {
    careers: []
};

const graduatesSlice = createSlice({
    name: 'graduates',
    initialState,
    reducers: {
        setCareers: (state, { payload }: PayloadAction<Career[]>) => {
            state.careers = payload;
        }
    }
});

export const { setCareers } = graduatesSlice.actions;
export default graduatesSlice.reducer;
