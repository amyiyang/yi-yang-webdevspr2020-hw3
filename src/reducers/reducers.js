import { combineReducers } from 'redux'
import addToReadBooks from "./addToReadReducer";
import deleteToReadBooks from "./deleteToReadReducer";
import addHaveReadBooks from "./addHaveReadReducer";
import deleteHaveReadBooks from "./deleteHaveReadReducer";

function fetchSearchBookList(
    state = {
        inFlight: false,
        list: []
    },
    action
) {
    switch (action.type) {
        case "REQUEST_SEARCH_LIST":
            return Object.assign({}, state, {
                inFlight: true
            });
        case "RECEIVE_SEARCH_SUCCESS":
            return Object.assign({}, state, {
                inFlight: false,
                list: action.bookList,
            });
        default:
            return state
    }
}

function fetchToReadBookList(
    state = {
        inFlight: false,
        list: []
    },
    action
) {
    switch (action.type) {
        case "REQUEST_TO_READ_LIST":
            return Object.assign({}, state, {
                inFlight: true
            });
        case "RECEIVE_TO_READ_SUCCESS":
            return Object.assign({}, state, {
                inFlight: false,
                list: action.bookList,
            });
        default:
            return state
    }
}

function fetchHaveReadBookList(
    state = {
        inFlight: false,
        list: []
    },
    action
) {
    switch (action.type) {
        case "REQUEST_HAVE_READ_LIST":
            return Object.assign({}, state, {
                inFlight: true
            });
        case "RECEIVE_HAVE_READ_SUCCESS":
            return Object.assign({}, state, {
                inFlight: false,
                list: action.bookList,
            });
        default:
            return state
    }
}

function updateBookRatings(
    state ={
        inFlight: false,
        ratings: null
    },
    action
) {
    switch (action.type) {
        case "REQUEST_UPDATE":
            return Object.assign({}, state, {
                inFlight: true
            });
        case "RECEIVE_UPDATE":
            return Object.assign({}, state, {
                inFlight: false,
                list: action.bookList,
            });
        default:
            return state
    }
}




const rootReducer = combineReducers({
    searchBookList: fetchSearchBookList,
    addToReadBooks,
    deleteToReadBooks,
    toReadBookList: fetchToReadBookList,
    deleteHaveReadBooks,
    addHaveReadBooks,
    haveReadBookList: fetchHaveReadBookList,
    bookRatings: updateBookRatings,
});

export default rootReducer