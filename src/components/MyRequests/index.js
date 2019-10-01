import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { getRequestFormInfo  } from './actions/requestFormAction';

import {Row, Col, Card, CardBody, CardHeader} from 'reactstrap';
import { NumericTextBox, MaskedTextBox, Input, Switch, Slider } from '@progress/kendo-react-inputs';
import { AutoComplete, ComboBox, DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';
import { Button} from '@progress/kendo-react-buttons';
import { Grid, GridColumn as Column, GridDetailRow, GridToolbar } from '@progress/kendo-react-grid';
import { Editor, EditorTools } from '@progress/kendo-react-editor';
import gridData from './orders.json';
const { Bold, Italic, Underline,
    AlignLeft, AlignRight, AlignCenter,
    Indent, Outdent,
    OrderedList, UnorderedList,
    Undo, Redo, Link, Unlink } = EditorTools;

class MyRequests extends Component {
    componentDidMount() {
        this.props.getRequestFormInfo("formID");
    }
    
    render() {
        return (
            <div>
                <Card style={{padding: '16px 24px'}}>
                    <div className="text-center" style={{fontSize: '28px', fontWeight: 'bold', margin: '24px 0px'}}>My Requests</div>
                        
                    <Grid
                        style={{ height: '400px' }}
                        sortable
                        filterable
                        data={gridData}
                        // onDataStateChange={this.dataStateChange}
                        >
                        <Column field="claimNumber" title="Claim Number" width="180px"/>
                        <Column field="policyNumber" title="Policy Number"/>
                        <Column field="firstName" title="First Name"/>
                        <Column field="requestDate" title="Request Date"/>
                        <Column field="status" title="Status"/>
                        <Column field="expiryDate" title="Expiry Date"/>
                    </Grid>
                </Card>
            </div>
        );
    };
}

// export default MyRequests;
const mapStateToProps = state => {
    console.log(state);
    return {
        formInfo: state.requestFormInfo
    }
}
export default withRouter(connect(mapStateToProps, { getRequestFormInfo })(MyRequests));
