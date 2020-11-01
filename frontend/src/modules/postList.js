import { readPostList } from '../lib/api/post'

const READ_POST_LIST_LOADING = 'postList/READ_POST_LIST_LOADING';
const READ_POST_LIST_SUCCESS = 'postList/READ_POST_LIST_SUCCESS';
const READ_POST_LIST_FAILURE = 'postList/READ_POST_LIST_FAILURE';

export const postListLoading = () => ({
    type: READ_POST_LIST_LOADING,
})
export const postListSuccess = (data) => ({
    type: READ_POST_LIST_SUCCESS,
    payload: data,
})
export const postListFailure = (error) => ({
    type: READ_POST_LIST_FAILURE,
    payload: error,
})

const initialState = {
    loading: false,
    data: null,
    error: null,
    lastPage: 1,
}

export const readPostListThunk = ({ page, username, tag}) => async (dispatch) => {
    dispatch({ type: READ_POST_LIST_LOADING });
    try {
        const result = await readPostList({ page, username, tag});
        if (result.isAxiosError) {
            dispatch({ type: READ_POST_LIST_FAILURE, payload: result.response });
            return;
        }
        dispatch({ type: READ_POST_LIST_SUCCESS, payload: result.data, meta: result });
    } catch (error) {
        console.log(error);
        dispatch({ type: READ_POST_LIST_FAILURE, payload: error});
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case READ_POST_LIST_LOADING:
            return {
                loading: true,
                data: null,
                error: null,
                lastPage: 1,
            }
        case READ_POST_LIST_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null,
                lastPage: parseInt(action.meta.headers['last-page']),
            }
        case READ_POST_LIST_FAILURE:
            return {
                loading: false,
                data: null,
                error: action.payload,
                lastPage: 1,
            }
        default:
            return state;
    }
}

export default reducer;