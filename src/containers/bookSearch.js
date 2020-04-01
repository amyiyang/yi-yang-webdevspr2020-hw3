import React from "react";
import {connect} from 'react-redux';
import {searchForBooks} from "../actions/featchBookListActions";
import {addBookToRead} from "../actions/toReadActions";
import {addBookHaveRead} from "../actions/haveReadActions";
import ToReadList from "./toReadList";
import HaveReadList from "./haveReadList"

class BookSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
        this.setKey = this.setKey.bind(this)
    }

    checkTextInput () {
        if (this.state.keyword === '') {
            alert('keyword cannot be empty')
        } else {
            this.props.handleClick(this.state.keyword);
        }
    }

    setKey (event) {
        this.setState({keyword: event.target.value});
    }

    render() {
        let keyWord = '';

        return (
            <div>
                <div>
                    <label>Search A Book</label>
                    <div>
                        {/*<input onChange={(e) => keyWord = e.target.value} name="keyWord" component="input" type="text"*/}
                        {/*       placeholder="Enter a keyWord here"/>*/}
                        <input
                            placeholder="Enter a keyword"
                            onChange={this.setKey}
                        />
                    </div>
                </div>
                <div>
                    <button
                        title="Submit"
                        onClick={() => this.checkTextInput()}
                        color="#606070"
                    >Search</button>
                    {/*<button type="submit" disabled={this.props.bookListInFlight}*/}
                    {/*        onClick={() => this.props.handleClick(keyword)}>Search*/}
                    {/*</button>*/}
                </div>

                <div> {this._renderBookList()} </div>

                <ToReadList/>
                <HaveReadList/>

            </div>

        );

    }

    _renderBookList() {
        if (!this.props.bookList || this.props.bookList.length === 0) {
            return null;
        }

        const bookRows = this.props.bookList.map(book => (
            <tr key={book.id}>
                <td>{book.volumeInfo.title}</td>
                <td>{book.volumeInfo.authors.toString()}</td>
                <td><button disabled={this.props.bookListInFlight || this._isInToReadList(book.id)} onClick={() => this.props.handleAddBookToRead(book)}>Add</button></td>
                <td><button disabled={this.props.bookListInFlight || this._isInHaveReadList(book.id)} onClick={() => this.props.handleAddBookHaveRead(book)}>Add</button></td>
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

    _isInToReadList(id) {
        for (var i = 0; i < this.props.toReadList.length; i++) {
            let book = this.props.toReadList[i];
            if (book.id === id) return true;
        }
        return false
    }

    _isInHaveReadList(id) {
        for (var i = 0; i < this.props.haveReadList.length; i++) {
            let book = this.props.haveReadList[i];
            if (book.id === id) return true;
        }
        return false
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
        toReadList: state.toReadBookList.list,
        haveReadList: state.haveReadBookList.list,
    }
};

export default BookSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(BookSearch);