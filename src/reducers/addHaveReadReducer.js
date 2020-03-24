import {combineReducers} from 'redux'

export function addHaveReadBooks(
    state = {
        requestStatus: "NONE",
        inFlight: false,
    },
    action
) {
    switch (action.type) {
        case "REQUEST_NEW_HAVE_READ":
            return Object.assign({}, state, {
                requestStatus: "SENDING",
                inFlight: true,
            });
        case "RESPONSE_NEW_HAVE_READ_ERROR":
            return Object.assign({}, state, {
                requestStatus: "ERROR",
                inFlight: false,
            });
        case "RESPONSE_NEW_HAVE_READ_ERROR":
            return Object.assign({}, state, {
                requestStatus: "SUCCESS",
                inFlight: false,
            });
        default:
            return state
    }
}

export default addHaveReadBooks;
