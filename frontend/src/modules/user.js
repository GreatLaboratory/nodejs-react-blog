import { check, logout } from "../lib/api/auth";

const SET_TEMP_USER = 'user/SET_TEMP_USER';
const CHECK_SUCCESS = 'user/CHECK_SUCCESS';
const CHECK_FAILURE = 'user/CHECK_FAILURE';
const LOGOUT_USER = 'user/LOGOUT_USER';

export const setTempUser = (data) => ({
    type: SET_TEMP_USER,
    payload: data,
})

export const checkSuccess = (data) => ({
    type: CHECK_SUCCESS,
    payload: data,
})
export const checkFailure = (error) => ({
    type: CHECK_FAILURE,
    payload: error,
})

export const logoutUser = () => ({
    type: LOGOUT_USER
});

const initialState = {
    data: null,
    error: null,
}

export const checkUserThunk = () => async (dispatch) => {
    try {
        const result = await check();
        if (result.message === 'Request failed with status code 401') {
            dispatch({ type: CHECK_FAILURE, payload: result });
            try {
                localStorage.removeItem('user');
            } catch (error) {
                console.log('localStorage is not working');
            }
            return;
        }
        dispatch({ type: CHECK_SUCCESS, payload: result });
    } catch (err) {
        dispatch({ type: CHECK_FAILURE, payload: err });
        throw err;
    }
};

export const logoutUserThunk = () => async (dispatch) => {
    try {
        await logout();
        dispatch({ type: LOGOUT_USER });
        try {
            localStorage.removeItem('user');
        } catch (error) {
            console.log('localStorage is not working');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEMP_USER:
        case CHECK_SUCCESS:
            return {
                data: action.payload,
                error: null,
            }
        case CHECK_FAILURE:
            return {
                data: null,
                error: action.payload,
            }
        case LOGOUT_USER:
            return initialState;
        default:
            return state;
    }
}

export default reducer;