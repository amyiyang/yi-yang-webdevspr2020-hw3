import React from "react";
import {connect} from 'react-redux';
import {fetchHaveReadList} from "../actions/featchBookListActions";
import {deleteHaveRead} from "../actions/haveReadActions";
import {moveToRead} from "../actions/haveReadActions";
import {updateRatings} from "../actions/haveReadActions";

class HaveReadList extends React.Component {

    constructor() {
        super();
        // this.state = {
        //     value : 3
        // }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

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
                <td>
                    <select value={book.ratings} onChange={e => this.props.handleUpdateRating(book.id, e.target.value)}>
                        <option value="1">1</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                    </select>
                </td>
                {/*<td><button onClick={() => this.props.handleUpdateRating(book)}>Update Rating</button></td>*/}
                <td><button onClick={() => this.props.handleDeleteHaveRead(book.id)}>Delete</button></td>
                <td><button onClick={() => this.props.handleMoveToRead(book)}>Move to To-Read</button></td>
            </tr>));
        return (<table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Authors</th>
                <th>Ratings</th>
            </tr>
            </thead>
            <tbody>
            {bookRows}
            </tbody>
        </table>)
    }

    // _selectRatings(book) {
    //     console.dir(book);
    //
    //     const selectRatings;
    //     return selectRatings;
    //
    //
    // }


}


function mapDispatchToProps(dispatch, props) {
    return {
        fetchHaveReadList: () => {dispatch(fetchHaveReadList())},
        handleDeleteHaveRead: (id) => {dispatch(deleteHaveRead(id))},
        handleMoveToRead: (book) => {dispatch(moveToRead(book))},
        handleUpdateRating: (id, newRatings) => {dispatch(updateRatings(id, newRatings))}
    }
};

function mapStateToProps(state, props) {
    return {
        haveReadList: state.haveReadBookList.list,
    }
};

export default HaveReadList = connect(
    mapStateToProps,
    mapDispatchToProps
)(HaveReadList);