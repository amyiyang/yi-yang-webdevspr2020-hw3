import React from "react";
import { MDBContainer } from 'mdbreact';
import {connect} from 'react-redux';
import {fetchToReadList} from "../actions/featchBookListActions";
import {deleteToRead} from "../actions/toReadActions";
import {moveHaveRead} from "../actions/toReadActions";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";


class ToReadList extends React.Component {

    componentDidMount() {
        this.props.fetchToReadList();
    }

    render() {

        return (

            <div id = "haveReadList">
                <br/>
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
                <td className="align-middle">{book.title}</td>
                <td className="align-middle">{(book.authors === undefined)? 'Unknown': book.authors.toString()}</td>
                <td className="buttonCol"><Button size="sm" variant="outline-danger" onClick={() => this.props.handleDeleteToRead(book.id)}>Delete</Button></td>
                <td className="buttonCol"><Button size="sm" variant="outline-info" onClick={() => this.props.handleMoveHaveRead(book)}>Move to Have-Read</Button></td>
            </tr>));
        return (
            <MDBContainer>
            <Table size="sm">
            <thead>
            <tr>
                <th>Title</th>
                <th>Authors</th>
                <th>Delete</th>
                <th>Move</th>
            </tr>
            </thead>
            <tbody>
            {bookRows}
            </tbody>
        </Table></MDBContainer>)
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