import Axios from 'axios'
import {fetchHaveReadList, fetchToReadList} from "./featchBookListActions"
import {addBookHaveRead} from "./haveReadActions";

function requestNewToRead() {
    return {
        type: "REQUEST_NEW_TO_READ"
    }
}

function receiveNewToReadSuccess(foodId) {
    return {
        type: "RESPONSE_NEW_TO_READ_SUCCESS",
        foodId
    }
}

function receiveNewToReadError() {
    return {
        type: "RESPONSE_NEW_TO_READ_ERROR"
    }
}


export function addBookToRead(newBook) {
    const book = {
        id: newBook.id,
        title: newBook.volumeInfo.title,
        authors: newBook.volumeInfo.authors
    }
    return function(dispatch) {
        dispatch(requestNewToRead());
        return Axios.post(`/api/toReadBook`, book)
            .then(
                response => dispatch(receiveNewToReadSuccess(response.data)),
                receiveNewToReadError
            ).then(
                () => dispatch(fetchToReadList()),
                receiveNewToReadError
            )
    }
}


function requestDeleteToRead() {
    return {
        type: "DELETE_TO_READ"
    }
}

function receiveDeleteToReadSuccess() {
    return {
        type: "RESPONSE_DELETE_TO_READ_SUCCESS",
    }
}

function receiveDeleteToReadError() {
    return {
        type: "RESPONSE_DELETE_TO_READ_ERROR"
    }
}

function afterDeleteToReadSuccess() {
    return{
        type: "AFTER_DELETE_TO_READ_SUCCESS"
    }
}

export function deleteToRead(id) {
    return function(dispatch) {
        dispatch(requestDeleteToRead());
        return Axios.delete(`/api/toReadBook/${id}`, id)
            .then(
                () => dispatch(receiveDeleteToReadSuccess()),
                receiveDeleteToReadError
            ).then(
                //() => dispatch(afterDeleteToReadSuccess()),
                () => dispatch(fetchToReadList()),
                receiveDeleteToReadError
            )
    }
}

export function moveHaveRead(book) {
    const newBookFormat = {
        id: book.id,
        volumeInfo: {
            title: book.title,
            authors: book.authors
        },
    }

    return function (dispatch) {
        dispatch(deleteToRead(book.id))
            .then(
                () => dispatch(addBookHaveRead(newBookFormat))
            ).then(
            () => dispatch(fetchToReadList())
        ).then(
            () => dispatch(fetchHaveReadList())
        )
    }
}
