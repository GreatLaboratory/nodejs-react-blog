import { readPost, readPostList } from '../lib/api/post'

const READ_POST_LOADING = 'post/READ_POST_LOADING';
const READ_POST_SUCCESS = 'post/READ_POST_SUCCESS';
const READ_POST_FAILURE = 'post/READ_POST_FAILURE';
const UNLOAD_POST = 'post/UNLOAD_POST';

export const postLoading = () => ({
    type: READ_POST_LOADING,
})
export const postSuccess = (data) => ({
    type: READ_POST_SUCCESS,
    payload: data,
})
export const postFailure = (error) => ({
    type: READ_POST_FAILURE,
    payload: error,
})

export const unloadPost = () => ({
    type: UNLOAD_POST,
})

const initialState = {
    loading: false,
    data: null,
    error: null,
}

export const readPostThunk = (id) => async (dispatch) => {
    dispatch({ type: READ_POST_LOADING });
    try {
        const result = await readPost(id);
        if (result.isAxiosError) {
            dispatch({ type: READ_POST_FAILURE, payload: result.response });
            return;
        }
        dispatch({ type: READ_POST_SUCCESS, payload: result });
    } catch (error) {
        console.log(error);
        dispatch({ type: READ_POST_FAILURE, payload: error});
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case READ_POST_LOADING:
            return {
                loading: true,
                data: null,
                error: null,
            }
        case READ_POST_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null,
            }
        case READ_POST_FAILURE:
            return {
                loading: false,
                data: null,
                error: action.payload,
            }
        case UNLOAD_POST:
            return initialState;
        default:
            return state;
    }
}

export default reducer;