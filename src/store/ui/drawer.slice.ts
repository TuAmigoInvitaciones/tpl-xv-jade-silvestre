import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const DRAWER_NAMES = {
    none: 'none',
    graduates: 'graduates',
} as const;

export type DrawerName = typeof DRAWER_NAMES[keyof typeof DRAWER_NAMES];

interface DrawerState {
    isOpen: boolean;
    drawerTitle: string;
    drawerName: DrawerName;
}

const initialState: DrawerState = {
    isOpen: false,
    drawerTitle: '',
    drawerName: DRAWER_NAMES.none,
};

const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        openDrawer: (state, action: PayloadAction<{ drawerName: DrawerName; drawerTitle: string }>) => {
            state.isOpen = true;
            state.drawerName = action.payload.drawerName;
            state.drawerTitle = action.payload.drawerTitle;
        },
        closeDrawer: (state) => {
            state.isOpen = false;
            state.drawerName = DRAWER_NAMES.none;
            state.drawerTitle = '';
        },
    },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
