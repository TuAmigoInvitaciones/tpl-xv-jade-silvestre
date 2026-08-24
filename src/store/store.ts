import { configureStore } from '@reduxjs/toolkit'

import modalReducer from './ui/modal.slice'
import menuReducer from './ui/menu.slice'
import musicReducer from './ui/music.slice'
import themeReducer from './ui/theme.slice'
import drawerReducer from './ui/drawer.slice'
import graduatesReducer from './graduates/graduates.slice'
import ticketReducer from './ticket/ticket.slice'
import confirmationReducer from './confirmation/confirmation.slice'

export const store = configureStore({
    reducer: {
        // UI STATE
        modal: modalReducer,
        menu: menuReducer,
        music: musicReducer,
        theme: themeReducer,
        drawer: drawerReducer,

        // FEATURES STATE
        graduates: graduatesReducer,
        ticket: ticketReducer,
        confirmation: confirmationReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch