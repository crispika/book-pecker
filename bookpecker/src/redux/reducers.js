import { combineReducers } from "redux";
import { RECEIVE_BOOKLIST, DELETE_BOOK, RECEIVE_BOOKINFO, RECEIVE_BOOK_COMMENTS, RECEIVE_TROLLEYDATA, UPDATE_TROLLEYDATA, CLEAR_STATE_TO_OBJ, CLEAR_STATE_TO_LIST } from "./action-types"

function book_list(state = [], action) {
    switch (action.type) {
        case RECEIVE_BOOKLIST:
            return action.data;
        case DELETE_BOOK:
            return state.filter(book => book.id !== action.data);
        case CLEAR_STATE_TO_OBJ:
            return action.data;
        default:
            return state;
    }
}

function book_description(state = {}, action) {
    switch (action.type) {
        case RECEIVE_BOOKINFO:
            return Object.assign({}, state, action.data);
        // return Object.assign(state, action.data); //修改了老状态，导致bug
        case RECEIVE_BOOK_COMMENTS:
            return Object.assign({}, state, action.data);
        // return Object.assign(state, action.data);
        case CLEAR_STATE_TO_OBJ:
            return action.data;
        default:
            return state;
    }
}

function trolley_data(state = [], action) {
    switch (action.type) {
        case RECEIVE_TROLLEYDATA:
            return action.data;
        case UPDATE_TROLLEYDATA:
            return action.data;
        case CLEAR_STATE_TO_LIST:
            return action.data;
        default:
            return state;
    }
}


export default combineReducers({
    book_list,
    book_description,
    trolley_data,
})
