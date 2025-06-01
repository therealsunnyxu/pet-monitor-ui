import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';


export enum DarkModeEnum {
    SYSTEM = 0,
    LIGHT = 1,
    DARK = 2,
    length
}


interface DarkModeState {
    value: DarkModeEnum;
}

function getInitialDarkMode() {
    const theme = localStorage.getItem("theme");
    switch (theme) {
        case "dark":
            return DarkModeEnum.DARK;
        case "light":
            return DarkModeEnum.LIGHT;
        default:
            return DarkModeEnum.SYSTEM;
    }
}
const initialState: DarkModeState = {
    value: getInitialDarkMode(),
}

function saveDarkModeTheme(setting: DarkModeEnum) {
    var stringified = "";
    switch (setting) {
        case DarkModeEnum.DARK:
            stringified = "dark";
            break;
        case DarkModeEnum.LIGHT:
            stringified = "light";
            break;
        default:
            stringified = "system";
            break;
    }

    localStorage.setItem('theme', stringified);
}

export const darkModeSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        toggle: (state) => {
            state.value = (state.value + 1) % DarkModeEnum.length;
            saveDarkModeTheme(state.value);
        },
        setDarkMode: (state, action: {
            payload: DarkModeEnum,
            type: any;
        }) => {
            state.value = action.payload;
            saveDarkModeTheme(state.value);
        }
    }
})

export const { toggle, setDarkMode } = darkModeSlice.actions;

export function selectDarkModeState(state: RootState) {
    if ("darkMode" in state && state.darkMode instanceof Object && "value" in state.darkMode) {
        return state.darkMode.value;
    }
}

export default darkModeSlice.reducer;