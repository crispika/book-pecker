import {combineReducers} from "redux";
import {RECEIVE_BOOKLIST,DELETE_BOOK} from "./action-types"

function book_list(book_list=[],action){
    switch (action.type) {
        case RECEIVE_BOOKLIST:
            return action.data;
        case DELETE_BOOK:
            return book_list.filter(book => book.id !== action.data);
        default:
            return book_list;
    }
}

export default combineReducers({
    book_list,
})
