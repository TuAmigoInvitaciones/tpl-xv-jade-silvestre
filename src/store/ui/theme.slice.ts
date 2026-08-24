import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ThemeColors {
    primary: string;
    secondary: string;
    tertiary: string;
}

export interface ThemeState {
    selectedColorValue: string | null;
    theme: ThemeColors | null;
}

const initialState: ThemeState = {
    selectedColorValue: null,
    theme: null,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, { payload }: PayloadAction<{ selectedValue: string; theme: ThemeColors }>) => {
            state.selectedColorValue = payload.selectedValue;
            state.theme = payload.theme;
        },
        resetTheme: (state) => {
            state.selectedColorValue = null;
            state.theme = null;
        }
    }
});

export const { setTheme, resetTheme } = themeSlice.actions;
export default themeSlice.reducer;
