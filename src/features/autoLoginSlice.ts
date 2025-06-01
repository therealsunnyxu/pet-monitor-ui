import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum AutoLoginEnum {
    UNKNOWN = 0,
    UNAUTHENTICATED = 1,
    AUTHENTICATED = 2
}
interface AutoLoginState {
    value: AutoLoginEnum;
}

const initialState: AutoLoginState = {
    value: AutoLoginEnum.UNKNOWN
};

export const autoLoginSlice = createSlice({
    name: "autoLogin",
    initialState,
    reducers: {
        setAutoLogin: (state, action: {
            payload: AutoLoginEnum,
            type: any
        }) => {
            state.value = action.payload;
        }
    }
})

export const { setAutoLogin } = autoLoginSlice.actions;

export function selectAutoLoginState(state: RootState) {
    if ("autoLogin" in state && state.autoLogin instanceof Object && "value" in state.autoLogin) {
        return state.autoLogin.value;
    }
}

export default autoLoginSlice.reducer;