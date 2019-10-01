import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import App from './App.jsx';
import { Ripple } from '@progress/kendo-react-ripple';

import './index.scss';
import "./Vendor";

import store from "./store";
import { Provider } from "react-redux";

const AppWithRouting = withRouter(App);

ReactDOM.render((
    <Provider store={store}>
        <Ripple>
            <HashRouter>
                <AppWithRouting />
            </HashRouter>
        </Ripple>
    </Provider>
    ),
    document.getElementById('root')
);
