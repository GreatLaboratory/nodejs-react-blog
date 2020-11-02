import { updatePost, writePost } from '../lib/api/write';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';

const WRITE_POST_LOADING = 'write/WRITE_POST_LOADING';
const WRITE_POST_SUCCESS = 'write/WRITE_POST_SUCCESS';
const WRITE_POST_FAILURE = 'write/WRITE_POST_FAILURE';

const UPDATE_POST_LOADING = 'write/UPDATE_POST_LOADING';
const UPDATE_POST_SUCCESS = 'write/UPDATE_POST_SUCCESS';
const UPDATE_POST_FAILURE = 'write/UPDATE_POST_FAILURE';

const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';

export const initialize = () => ({
    type: INITIALIZE,
});
export const changeField = ({ key, value }) => ({
    type: CHANGE_FIELD,
    payload: {
        key,
        value,
    }
});
export const writePostLoading = () => ({
    type: WRITE_POST_LOADING,
})
export const writePostSuccess = ({ title, body, tagList }) => ({
    type: WRITE_POST_SUCCESS,
    payload: {
        title,
        body,
        tagList,
    }
})
export const writePostFailure = (error) => ({
    type: WRITE_POST_FAILURE,
    payload: error
})

export const updatePostLoading = () => ({
    type: UPDATE_POST_LOADING,
})
export const updatePostSuccess = ({ id, title, body, tagList }) => ({
    type: UPDATE_POST_SUCCESS,
    payload: {
        id, 
        title,
        body,
        tagList,
    }
})
export const updatePostFailure = (error) => ({
    type: UPDATE_POST_FAILURE,
    payload: error
})

export const setOriginalPost = (data) => ({
    type: SET_ORIGINAL_POST,
    payload: data,
})

export const writePostThunk = ({ title, body, tagList }) => async (dispatch) => {
    dispatch({ type: WRITE_POST_LOADING });
    try {
        const result = await writePost({ title, body, tagList });
        console.log(result);
        if (result.isAxiosError) {
            // console.log('result ==> ' + result);
            dispatch({ type: WRITE_POST_FAILURE, payload: result.response });
            return;
        }
        dispatch({ type: WRITE_POST_SUCCESS, payload: result });
    } catch (err) {
        console.log(err);
        dispatch({ type: WRITE_POST_FAILURE, payload: err });
    }
}

export const updatePostThunk = ({ id, title, body, tagList }) => async (dispatch) => {
    dispatch({ type: UPDATE_POST_LOADING });
    try {
        const result = await updatePost({ id, title, body, tagList });
        console.log(result);
        if (result.isAxiosError) {
            // console.log('result ==> ' + result);
            dispatch({ type: UPDATE_POST_FAILURE, payload: result.response });
            return;
        }
        dispatch({ type: UPDATE_POST_SUCCESS, payload: result });
    } catch (err) {
        console.log(err);
        dispatch({ type: UPDATE_POST_FAILURE, payload: err });
    }
}

const initialState = {
    title: '',
    body: '',
    tagList: ['tag1', 'tag2', 'tag3'],
    post: {
        loading: false,
        data: null,
        error: null,
    },
    originalPostId: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE:
            return initialState;
        case CHANGE_FIELD:
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };
        case WRITE_POST_LOADING:
        case UPDATE_POST_LOADING:
            return {
                ...state,
                post: {
                    loading: true,
                    data: null,
                    error: null,
                }
            }
        case WRITE_POST_SUCCESS:
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                post: {
                    loading: false,
                    data: action.payload,
                    error: null,
                }
            }
        case WRITE_POST_FAILURE:
        case UPDATE_POST_FAILURE:
            return {
                ...state,
                post: {
                    loading: false,
                    data: null,
                    error: action.payload,
                }
            }
        case SET_ORIGINAL_POST:
            return {
                ...state,
                title: action.payload.title,
                body: action.payload.body,
                tagList: action.payload.tags,
                originalPostId: action.payload._id,
            }
        default:
            return state;
    }
}

export default reducer;