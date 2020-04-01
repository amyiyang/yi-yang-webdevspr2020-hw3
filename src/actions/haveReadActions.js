import Axios from 'axios'
import {fetchHaveReadList} from "./featchBookListActions"
import {fetchToReadList} from "./featchBookListActions";
import {addBookToRead} from "./toReadActions";

function requestNewHaveRead() {
    return {
        type: "REQUEST_NEW_HAVE_READ"
    }
}

function receiveNewHaveReadSuccess(foodId) {
    return {
        type: "RESPONSE_NEW_HAVE_READ_SUCCESS",
        foodId
    }
}

function receiveNewHaveReadError() {
    return {
        type: "RESPONSE_NEW_HAVE_READ_ERROR"
    }
}


export function addBookHaveRead(newBook) {
    const book = {
        id: newBook.id,
        title: newBook.volumeInfo.title,
        authors: newBook.volumeInfo.authors
    }
    return function(dispatch) {
        dispatch(requestNewHaveRead());
        return Axios.post(`/api/haveReadBook`, book)
            .then(
                response => dispatch(receiveNewHaveReadSuccess(response.data)),
                receiveNewHaveReadError
            ).then(
                () => dispatch(fetchHaveReadList()),
                receiveNewHaveReadError
            )
    }
}


function requestDeleteHaveRead() {
    return {
        type: "DELETE_HAVE_READ"
    }
}

function receiveDeleteHaveReadSuccess() {
    return {
        type: "RESPONSE_DELETE_HAVE_READ_SUCCESS",
    }
}

function receiveDeleteHaveReadError() {
    return {
        type: "RESPONSE_DELETE_HAVE_READ_ERROR"
    }
}


export function deleteHaveRead(id) {
    return function(dispatch) {
        dispatch(requestDeleteHaveRead());
        return Axios.delete(`/api/haveReadBook/${id}`, id)
            .then(
                () => dispatch(receiveDeleteHaveReadSuccess()),
                receiveDeleteHaveReadError
            ).then(
                //() => dispatch(afterDeleteToReadSuccess()),
                () => dispatch(fetchHaveReadList()),
                receiveDeleteHaveReadError
            )
    }
}

export function moveToRead(book) {
    const newBookFormat = {
        id: book.id,
        volumeInfo: {
            title: book.title,
            authors: book.authors
        },
    }

    return function(dispatch) {
        dispatch(deleteHaveRead(book.id))
            .then(
                () => dispatch(addBookToRead(newBookFormat))
            ).then(
            () => dispatch(fetchHaveReadList())
            ).then (
            () => dispatch(fetchToReadList())
        )
    }
}

function requestUpdate() {
    return {
        type: "REQUEST_UPDATE"
    }
}

function receiveUpdateSuccess(foodId) {
    return {
        type: "RECEIVE_UPDATE",

    }
}

export function updateRatings(id, newRatings) {
    const bookNewRating = {
        ratings: parseInt(newRatings)
    }
    return function(dispatch) {
        dispatch(requestUpdate());
        // ${id}`
        return Axios.put(`/api/haveReadBook/update/${id}`,bookNewRating)
            .then(
                () => dispatch(receiveUpdateSuccess())
            ).then(
                () => dispatch(fetchHaveReadList())
            )
    }
}
