import { configureStore } from '@reduxjs/toolkit';
import autoLoginReducer from "./features/autoLoginSlice";
import darkModeReducer from "./features/darkModeSlice";
import publicDetailsReducer from "./features/publicDetailsSlice";
export const store = configureStore({
    reducer: {
        darkMode: darkModeReducer,
        autoLogin: autoLoginReducer,
        publicDetails: publicDetailsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;