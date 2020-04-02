import React from "react";
import {connect} from 'react-redux';
import {searchForBooks} from "../actions/featchBookListActions";
import {addBookToRead} from "../actions/toReadActions";
import {addBookHaveRead} from "../actions/haveReadActions";
import ToReadList from "./toReadList";
import HaveReadList from "./haveReadList"
import {Container, Tabs, Tab, Sonnet} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import '../css/style.css';

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
            <div id = "search">
                <Container>
                    <Row>
                        <Col lg={3} sm={0}></Col>
                        <Col lg={6} sm={12}>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Search Books:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter a keyword"
                                                  onChange={this.setKey} />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col lg={3} sm={0}></Col>
                    </Row>

                    <Row>

                        <Col lg={3} sm={0}></Col>
                        <Col lg={6} sm={12}>
                            <Button
                                variant="primary" size="md"
                                title="Submit"
                                onClick={() => this.checkTextInput()}
                            >Search</Button>
                        </Col>
                        <Col lg={3} sm={0}></Col>
                    </Row>

                    <br />
                    <div id = "bookList"> {this._renderBookList()} </div>

                    <br/>
                    <br/>

                    <Tabs defaultActiveKey="ToReadList" fill>
                        <Tab eventKey="ToReadList" title="To Read List" size="lg">
                            <ToReadList />
                        </Tab>
                        <Tab eventKey="HaveReadList" title="Have Read List">
                            <HaveReadList />
                        </Tab>

                    </Tabs>

                </Container>
            </div>

        );

    }

    _renderBookList() {
        if (!this.props.bookList || this.props.bookList.length === 0) {
            return "";
        }

        const bookRows = this.props.bookList.map(book => (
            <tr key={book.id}>
                <td>{book.volumeInfo.title}</td>
                <td>{book.volumeInfo.authors.toString()}</td>
                <td class="buttonCol"><Button size="sm" variant="link" disabled={this.props.bookListInFlight || this._isInToReadList(book.id)} onClick={() => this.props.handleAddBookToRead(book)}>Add</Button></td>
                <td class="buttonCol"><Button size="sm" variant="link" disabled={this.props.bookListInFlight || this._isInHaveReadList(book.id)} onClick={() => this.props.handleAddBookHaveRead(book)}>Add</Button></td>
            </tr>));
        return (<Table striped size="sm" bordered responsive>
            <thead>
            <tr>
                <th>Title</th>
                <th>Authors</th>
                <th>To Read List</th>
                <th>Have Read List</th>
            </tr>
            </thead>
            <tbody>
            {bookRows}
            </tbody>
        </Table>)
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