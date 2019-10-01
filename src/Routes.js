import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

/* loader component for Suspense*/
import PageLoader from './components/Common/PageLoader';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';

/* Used to render a lazy component with react-router */
const waitFor = Tag => props => <Tag {...props}/>;

const Profile = lazy(() => import('./components/Profile'));
const NewRequest = lazy(() => import('./components/NewRequest'));
const MyRequests = lazy(() => import('./components/MyRequests'));
const SharedWithMe = lazy(() => import('./components/SharedWithMe'));
const SharedByhMe = lazy(() => import('./components/SharedByMe'));



const listofPages = [
    // '/login',
    // '/register',
    // '/recover',
    // '/lock',
    // '/notfound',
    // '/error500',
    // '/maintenance'
];

const Routes = ({ location }) => {

    if(listofPages.indexOf(location.pathname) > -1) {
        return (
            <BasePage>
                <Suspense fallback={<PageLoader/>}>
                    <Switch location={location}>
                        {/* <Route path="/login" component={waitFor(Login)}/>
                        <Route path="/register" component={waitFor(Register)}/>
                        <Route path="/recover" component={waitFor(Recover)}/>
                        <Route path="/lock" component={waitFor(Lock)}/>
                        <Route path="/notfound" component={waitFor(NotFound)}/>
                        <Route path="/error500" component={waitFor(Error500)}/>
                        <Route path="/maintenance" component={waitFor(Maintenance)}/> */}
                    </Switch>
                </Suspense>
            </BasePage>
        )
    }
    else {
        return (
            <Base location={location}>
                <div>
                    <Suspense fallback={<PageLoader/>}>
                        {location.pathname === '/' ? <Redirect from="/" to="/dashboard" /> : null}
                        <Switch location={location}>
                            <Route path="/profile" component={waitFor(Profile)}/>
                            <Route path="/newRequest" component={waitFor(NewRequest)}/>
                            <Route path="/myRequests" component={waitFor(MyRequests)}/>
                            <Route path="/shareWithMe" component={waitFor(SharedWithMe)}/>
                            <Route path="/sharedByMe" component={waitFor(SharedByhMe)}/>
                        </Switch>
                    </Suspense>
                </div>
            </Base>
        )
    }
}

export default withRouter(Routes);