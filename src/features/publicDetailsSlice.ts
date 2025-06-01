import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface PublicDetailsState {
    value: {
        username: string
    }
}

const initialState: PublicDetailsState = {
    value: {
        username: ""
    }
}

export const publicDetailsSlice = createSlice({
    name: "publicDetails",
    initialState,
    reducers: {
        setDisplayedUsername: (state, action: {
            payload: string,
            type: any
        }) => {
            state.value.username = action.payload;
        }
    }
})

export const { setDisplayedUsername } = publicDetailsSlice.actions;

export function selectUsername(state: RootState): string {
    if ("publicDetails" in state
        && state.publicDetails instanceof Object
        && "value" in state.publicDetails
        && "username" in state.publicDetails.value) {
        return state.publicDetails.value.username;
    }

    return "fucker";
}

export default publicDetailsSlice.reducer;