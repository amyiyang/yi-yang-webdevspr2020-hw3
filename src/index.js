import React from 'react';
import ReactDOM from 'react-dom';
import BookSearch from './containers/bookSearch'
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/reducers";
import thunkMiddleware from 'redux-thunk';
import {
    BrowserRouter, Switch,
    Route, Redirect
} from "react-router-dom";

const store = createStore(reducer, applyMiddleware(thunkMiddleware));


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                {/*<Route path="/food/create" component={FoodCreator}/>*/}
                {/*<Route path="/food" component={FoodListViewer} />*/}
                <Route path="/search" component={BookSearch} />
                <Redirect exact from="/" to="search" />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);