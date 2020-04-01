import React from "react";
import Select from 'react-select';
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
        this.state = {
            selectedOption: null,
        }
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

    findRating(id) {
        let r = '';
        for (var i = 0; i < this.props.haveReadList; i++) {
            if (this.props.haveReadList[i].id === id) {
                r = this.props.haveReadList[i].ratings + '';
            }
        }
        return r;
    }

    _handleChange(event, id, newRatings) {
        this.setState({selectedOption: event.target.value});
        this.props.handleUpdateRating(id, this.state.selectedOption);
    }

    tryhandleChange = selectedOption => {
        this.setState(
            { selectedOption },
            () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    _renderHaveReadList() {

        if (!this.props.haveReadList || this.props.haveReadList.length === 0) {
            return null;
        }

        const options = [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
        ];

        const { selectedOption } = this.state;

        const bookRows = this.props.haveReadList.map(book => (
            <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.authors.toString()}</td>
                <td>{String(book.ratings)}</td>
                <td>
                    <select value={selectedOption} onChange={e => this.props.handleUpdateRating(book.id, e.target.value)} options={options} >
                    {/*<Select*/}
                    {/*    value={selectedOption}*/}
                    {/*    onChange={this.tryhandleChange}*/}
                    {/*    options={options}*/}
                    {/*/>*/}
                        <option value={book.ratings} selected>{book.ratings}</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </td>
                <td><button onClick={() => this.props.handleDeleteHaveRead(book.id)}>Delete</button></td>
                <td><button onClick={() => this.props.handleMoveToRead(book)}>Move to To-Read</button></td>
            </tr>));
        return (<table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Authors</th>
                <th>rating</th>
                <th>Ratings</th>
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