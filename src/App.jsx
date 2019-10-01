import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from './Routes';
// import { classNames } from '@progress/kendo-react-common';

class App extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <React.Fragment>
        <Routes {...this.props}/>
      </React.Fragment>
    );
  }
}

export default connect()(App);
