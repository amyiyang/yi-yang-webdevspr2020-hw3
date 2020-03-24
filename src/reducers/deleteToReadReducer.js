export function deleteToReadBooks(
    state = {
        requestStatus: "NONE",
        inFlight: false,
    },
    action
) {
    switch (action.type) {
        case "DELETE_TO_READ":
            return Object.assign({}, state, {
                requestStatus: "SENDING",
                inFlight: true,
            });
        case "RESPONSE_DELETE_TO_READ_ERROR":
            return Object.assign({}, state, {
                requestStatus: "ERROR",
                inFlight: false,
            });
        case "RESPONSE_DELETE_TO_READ_SUCCESS":
            return Object.assign({}, state, {
                requestStatus: "SUCCESS",
                inFlight: false,
            });
        case "AFTER_DELETE_TO_READ_SUCCESS":
            return Object.assign({}, state, {
                requestStatus: "NONE",
                inFlight: false,
            });
        default:
            return state
    }
}

export default deleteToReadBooks;