import React from "react";
import {connect} from 'react-redux';
import {fetchToReadList} from "../actions/featchBookListActions";
import {deleteToRead} from "../actions/toReadActions";
import {moveHaveRead} from "../actions/toReadActions";

class ToReadList extends React.Component {

    componentDidMount() {
        this.props.fetchToReadList();
    }

    render() {

        return (
            <div>
                <h1> To Read List </h1>
                <div> {this._renderToReadList()}</div>
            </div>
        );
    }

    _renderToReadList() {

        if (!this.props.toReadList || this.props.toReadList.length === 0) {
            return null;
        }

        const bookRows = this.props.toReadList.map(book => (
            <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.authors}</td>
                <td><button onClick={() => this.props.handleDeleteToRead(book.id)}>Delete</button></td>
                <td><button onClick={() => this.props.handleMoveHaveRead(book)}>Move to Have-Read</button></td>
            </tr>));
        return (<table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Authors</th>
            </tr>
            </thead>
            <tbody>
            {bookRows}
            </tbody>
        </table>)
    }

}


function mapDispatchToProps(dispatch, props) {
    return {
        fetchToReadList: () => {dispatch(fetchToReadList())},
        handleDeleteToRead: (id) => {dispatch(deleteToRead(id))},
        handleMoveHaveRead: (book) => {dispatch(moveHaveRead(book))}
    }
};

function mapStateToProps(state, props) {
    return {
        toReadList: state.toReadBookList.list
    }
};

export default ToReadList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ToReadList);