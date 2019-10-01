import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/settings/settings.actions';

import HeaderRun from './Header.run'

class Header extends Component {

    componentDidMount() {
        HeaderRun();
    }

    toggleUserblock = e => {
        e.preventDefault();
        // this.props.actions.toggleSetting('showUserBlock');
    }

    toggleOffsidebar = e => {
        e.preventDefault()
        // this.props.actions.toggleSetting('offsidebarOpen');
    }

    toggleCollapsed = e => {
        e.preventDefault()
        this.props.actions.toggleSetting('isCollapsed');
        this.resize()
    }

    toggleAside = e => {
        e.preventDefault()
        this.props.actions.toggleSetting('asideToggled');
    }

    resize () {
        // all IE friendly dispatchEvent
        var evt = document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
        // modern dispatchEvent way
        // window.dispatchEvent(new Event('resize'));
    }

    render() {
        return (
            <header className="topnavbar-wrapper">
                <nav className="navbar topnavbar">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#/">
                            <div className="brand-logo-collapsed">
                                <img className="img-fluid mr-2" src="img/logo-single.png" alt="App Logo" style={{height: '56px'}}/>
                            </div>
                            <div className="brand-logo">
                                <img className="img-fluid mr-2" src="img/logo.png" alt="App Logo" style={{height: '56px'}}/>
                            </div>
                        </a>
                    </div>
                    <ul className="navbar-nav mr-auto flex-row">
                        <li className="nav-item">
                            <a href="#" className="nav-link d-none d-md-block d-lg-block d-xl-block" onClick={ this.toggleCollapsed }>
                                <em className="fas fa-bars"></em>
                            </a>
                            <a href="#"  className="nav-link sidebar-toggle d-md-none" onClick={ this.toggleAside }>
                                <em className="fas fa-bars"></em>
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item">
                            <a className="nav-link" href="#" data-search-open="">
                                <em className="icon-magnifier"></em>
                            </a>
                        </li>
                        <li className="nav-item d-none d-md-block">
                            <a className="nav-link">
                                <em className="icon-bell"></em>
                            </a>
                        </li>
                        
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center" href="#">
                                <img src="img/user.jpg" style={{ 'maxWidth': '100%' }} className="img-circle img-medium" />
                                <div>
                                    <div style={{fontSize: '18px'}}>Katty Rite</div>
                                    <div style={{fontSize: '12px'}}>Web Designer</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <form className="navbar-form" role="search" action="search.html">
                       <div className="form-group">
                          <input className="form-control" type="text" placeholder="Type and hit enter ..."/>
                          <div className="fa fa-times navbar-form-close" data-search-dismiss=""></div>
                       </div>
                       <button className="d-none" type="submit">Submit</button>
                    </form>
                </nav>
            </header>
            );
    }

}

Header.propTypes = {
    actions: PropTypes.object,
    settings: PropTypes.object
};

const mapStateToProps = state => ({ settings: state.settings })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);