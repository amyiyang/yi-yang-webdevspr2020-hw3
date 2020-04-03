import Axios from 'axios'

function requestSearchList() {
    return {
        type: "REQUEST_SEARCH_LIST"
    }
}

function receiveSearchSuccess(bookList) {
    return {
        type: "RECEIVE_SEARCH_SUCCESS",
        bookList
    }
}

function receiveSearchError() {
    return {
        type: "RECEIVE_SEARCH_ERROR"
    }
}

export function searchForBooks(keyWord) {
    let url = '';
    //url = process.env.REACT_APP_GOOGLE_BOOKS_KEY_PRE.concat(keyWord, process.env.REACT_APP_GOOGLE_BOOKS_KEY_POST);
    return function(dispatch) {
        dispatch(requestSearchList());
        // return Axios.get(url)
        return Axios.get(`https://www.googleapis.com/books/v1/volumes?q=${keyWord}&key=AIzaSyAXV1VDgjNn9ZWDpuYxJUxDUxpqb8iNAOU`)
            .then(
                response => dispatch(receiveSearchSuccess(response.data.items)),
                receiveSearchError)
    }
}

function requestToReadList() {
    return {
        type: "REQUEST_TO_READ_LIST"
    }
}

function receiveToReadSuccess(bookList) {
    return {
        type: "RECEIVE_TO_READ_SUCCESS",
        bookList
    }
}

function receiveToReadError() {
    return {
        type: "RECEIVE_TO_READ_ERROR"
    }
}

export function fetchToReadList() {
    return function(dispatch) {
        dispatch(requestToReadList());
        return Axios.get(`/api/toReadBook`)
            .then(response => dispatch(receiveToReadSuccess(response.data)),
                error => console.log('An error occurred.', error)
            )

    }
}

function requestHaveReadList() {
    return {
        type: "REQUEST_HAVE_READ_LIST"
    }
}

function receiveHaveReadSuccess(bookList) {
    return {
        type: "RECEIVE_HAVE_READ_SUCCESS",
        bookList
    }
}

function receiveHaveReadError() {
    return {
        type: "RECEIVE_HAVE_READ_ERROR"
    }
}

export function fetchHaveReadList() {
    return function(dispatch) {
        dispatch(requestHaveReadList());
        return Axios.get(`/api/haveReadBook`)
            .then(response => dispatch(receiveHaveReadSuccess(response.data)),
                error => console.log('An error occurred.', error)
            )
    }
}
