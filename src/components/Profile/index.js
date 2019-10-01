import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Switch from '@material-ui/core/Switch';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAskDelete: false,
            showProfileUpdate: false,
            isWithOverlay: false
        }

        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onUpdateClick = this.onUpdateClick.bind(this);
    }

    componentDidMount() {
        let url = this.props.gitUserApiUrl;
        let options = this.props.gitOptions;

        if (typeof (url) !== 'undefined') {
            fetch(url, options)
                .then(response => response.json())
                .then(json => this.setState(json));
        }
    }

    onUpdateClick() {
        this.setState((prevState, props) => ({
            showProfileUpdate: !prevState.showProfileUpdate,
            isWithOverlay: !prevState.isWithOverlay
        })
        );

    }

    onDeleteClick() {
        this.setState((prevState) => ({
            showAskDelete: !prevState.showAskDelete,
            isWithOverlay: !prevState.isWithOverlay
        }));
    }

    render() {
        return (
            this.state &&
            <div className="container-fluid" id="profile">
                <h1 style={{color: 'grey'}}>This is the Profile page.</h1>
            </div>
        );
    }
}

export default Profile;
