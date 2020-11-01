import { login, register } from '../lib/api/auth'; 

// 액션 타입 선언
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const REGISTER_LOADING = 'auth/REGISTER_LOADING';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

const LOGIN_LOADING = 'auth/LOGIN_LOADING';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

// 액션 생성함수 선언
export const changeField = ({ formType, key, value}) => ({
    type: CHANGE_FIELD,
    formType,
    key,
    value,
})
export const initializeForm = (formType) => ({
    type: INITIALIZE_FORM,
    formType,
})
export const registerLoading = () => ({
    type: REGISTER_LOADING,
})
export const registerSuccess = ({ username, password }) => ({
    type: REGISTER_SUCCESS,
    payload: {
        username,
        password,
    }
})
export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error
})
export const loginLoading = () => ({
    type: LOGIN_LOADING,
})
export const loginSuccess = ({ username, password }) => ({
    type: LOGIN_SUCCESS,
    payload: {
        username,
        password,
    }
})
export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
})

// 초기상태값 설정
const initialState = {
    register: {
        username: '',
        password: '',
        passwordConfirm: '',
    },
    login: {
        username: '',
        password: '',
    },
    auth: {
        loading: false,
        data: null,
        error: null,
    },
};

// thunk 함수 선언
export const registerThunk = ({ username, password }) => async (dispatch) => {
    dispatch({ type: REGISTER_LOADING });
    try {
        const result = await register({ username, password });
        if (result.isAxiosError) {
            dispatch({ type: REGISTER_FAILURE, payload: result });
            return;
        }
        dispatch({ type: REGISTER_SUCCESS, payload: result });
    } catch (err) {
        dispatch({ type: REGISTER_FAILURE, payload: err });
        throw err;
    }
};
export const loginThunk = ({ username, password }) => async (dispatch) => {
    dispatch({ type: LOGIN_LOADING });
    try {
        const result = await login({ username, password });
        if (result.isAxiosError) {
            dispatch({ type: LOGIN_FAILURE, payload: result });
            return;
        }
        dispatch({ type: LOGIN_SUCCESS, payload: result });
    } catch (err) {
        dispatch({ type: LOGIN_FAILURE, payload: err });
        throw err;
    }
};

// 리듀서 함수 선언
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_FIELD:
            return {
                ...state,
                [action.formType]: {
                    ...state[action.formType],
                    [action.key]: action.value,
                }
            }
        case INITIALIZE_FORM:
            return {
                ...state,
                [action.formType]: initialState[action.formType]
            };
        case REGISTER_LOADING:
        case LOGIN_LOADING:
            return {
                ...state,
                auth: {
                    loading: true,
                    data: null,
                    error: null,
                },
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                auth: {
                    loading: false,
                    data: action.payload,
                    error: null,
                },
            }
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
            return {
                ...state,
                auth: {
                    loading: false,
                    data: null,
                    error: action.payload,
                },
            }
        default:
            return state;
    }
}

export default reducer;