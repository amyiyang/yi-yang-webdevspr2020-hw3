import React from "react";
import {connect} from 'react-redux';
import {searchForBooks} from "../actions/featchBookListActions";
import {addBookToRead} from "../actions/toReadActions";
import {addBookHaveRead} from "../actions/haveReadActions";
import ToReadList from "./toReadList";
import HaveReadList from "./haveReadList"

class BookSearch extends React.Component {


    render() {
        let keyWord = '';

        return (
            <div>
                <div>
                    <label>Search A Book</label>
                    <div>
                        {/*Todo: not allowed empty value*/}
                        <input onChange={(e) => keyWord = e.target.value} name="keyWord" component="input" type="text"
                               placeholder="Enter a keyWord here"/>
                    </div>
                </div>
                <div>
                    <button type="submit" disabled={this.props.bookListInFlight}
                            onClick={() => this.props.handleClick(keyWord)}>Search
                    </button>
                </div>
                <div> {this._renderFoodList()} </div>
                <ToReadList/>
                <HaveReadList/>

            </div>

        );

    }

    _renderFoodList() {

        if (!this.props.bookList || this.props.bookList.length === 0) {
            return null;
        }

        const bookRows = this.props.bookList.map(book => (
            <tr key={book.id}>
                <td>{book.volumeInfo.title}</td>
                <td>{book.volumeInfo.authors}</td>
                <td><button disabled={this.props.bookListInFlight || this._isInList(book.id)} onClick={() => this.props.handleAddBookToRead(book)}>Add</button></td>
                <td><button disabled={this.props.bookListInFlight} onClick={() => this.props.handleAddBookHaveRead(book)}>Add</button></td>
            </tr>));
        return (<table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Authors</th>
                <th>To-Read List</th>
                <th>Have-Read List</th>
            </tr>
            </thead>
            <tbody>
            {bookRows}
            </tbody>
        </table>)
    }

    _isInList(id) {
        //todo
        return false;
    }


}

function mapDispatchToProps(dispatch, props) {
    return {
        handleClick: (request) => dispatch(searchForBooks(request)),
        handleAddBookToRead: (book) => dispatch(addBookToRead(book)),
        handleAddBookHaveRead: (book) => dispatch(addBookHaveRead(book)),
    }
};

function mapStateToProps(state, props) {
    return {
        requestStatus: state.searchBookList.requestStatus,
        bookListInFlight: state.searchBookList.inFlight,
        bookList: state.searchBookList.list,
    }
};

export default BookSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(BookSearch);