import React from "react";
import {connect} from 'react-redux';
import {fetchHaveReadList} from "../actions/featchBookListActions";
import {deleteHaveRead} from "../actions/haveReadActions";
import {moveToRead} from "../actions/haveReadActions";

class HaveReadList extends React.Component {

    componentDidMount() {
        this.props.fetchHaveReadList();
    }

    render() {

        return (
            <div>
                <h1> Have Read List </h1>
                <div> {this._renderHaveReadList()}</div>
            </div>
        );
    }

    _renderHaveReadList() {

        if (!this.props.haveReadList || this.props.haveReadList.length === 0) {
            return null;
        }

        const bookRows = this.props.haveReadList.map(book => (
            <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.authors}</td>
                <td><button onClick={() => this.props.handleDeleteHaveRead(book.id)}>Delete</button></td>
                <td><button onClick={() => this.props.handleMoveToRead(book)}>Move to To-Read</button></td>
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
        fetchHaveReadList: () => {dispatch(fetchHaveReadList())},
        handleDeleteHaveRead: (id) => {dispatch(deleteHaveRead(id))},
        handleMoveToRead: (book) => {dispatch(moveToRead(book))}
    }
};

function mapStateToProps(state, props) {
    return {
        haveReadList: state.haveReadBookList.list
    }
};

export default HaveReadList = connect(
    mapStateToProps,
    mapDispatchToProps
)(HaveReadList);