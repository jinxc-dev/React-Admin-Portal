import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { getRequestFormInfo, setRequestFormInfo} from './actions/requestFormAction';

import { Row, Col, Card } from 'reactstrap';
import { Input, MaskedTextBox} from '@progress/kendo-react-inputs';
import { Button} from '@progress/kendo-react-buttons';
import { Editor, EditorTools } from '@progress/kendo-react-editor';

import { Animation} from '@progress/kendo-react-animation';
import { Popup } from '@progress/kendo-react-popup';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

import BasicInfomation from './basicInfomation';
import DocumentGroupList from './documentGroupList';

const { Bold, Italic, Underline,
    AlignLeft, AlignRight, AlignCenter,
    Indent, Outdent,
    OrderedList, UnorderedList,
    Undo, Redo, Link, Unlink } = EditorTools;

    
class NewRequest extends Component {
    state = {
        visible: false,
        emailChannel: null,
        phoneChannel: null,
        channelPopUpStatus: [false, false],
        btnGroupStatus: false,
        isShowActions: false,
        formDataChanges: [],
        
    }
    componentDidMount() {
        this.props.getRequestFormInfo("formID");
        window.addEventListener('scroll', this.handleScroll);
        this.formRef = React.createRef();
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll = (event) =>{
        let sPos = event.target.documentElement.scrollTop;
        if (this.state.btnGroupStatus && sPos < 150) this.setState({btnGroupStatus: false})
        else if (!this.state.btnGroupStatus && sPos >= 150) this.setState({btnGroupStatus: true})
    }
    toggleDialog = () => {
        this.setState({visible: !this.state.visible});
    }
    createChannels(){
        this.state.emailChannel = this.props.formInfo.emailChannel;
        this.state.phoneChannel = this.props.formInfo.textChannel;
        let channelComps = [];
        if(this.props.formInfo.isEmailEnabled){
            channelComps.push(
                <Col md="4">
                    <div className="c-input-icon" >
                        <Input type="email" label="Email" name='email' id='email' style={{width: '100%'}} defaultValue={this.state.emailChannel.emailAddress}/>
                        <span className="icon"
                            ref={(icon) =>{this.emailVerifyIcon = icon}}
                            onClick={()=>{this.setState({channelPopUpStatus: [!this.state.channelPopUpStatus[0], this.state.channelPopUpStatus[1]]})}}>
                            {this.state.emailChannel.isEmailVerified ? 
                                <i class='k-icon k-i-check c-i-success'></i> :
                                <i class='k-icon k-i-cancel c-i-warning'></i>
                            }
                        </span>

                        <Popup
                            anchor={this.emailVerifyIcon}
                            show={this.state.channelPopUpStatus[0]}
                            popupClass={'popup-content'}
                        >
                            {!this.state.emailChannel.isEmailVerified && 
                                <div style={{textAlign: 'center'}}>
                                    <Button className="btn_info" onClick={this.toggleDialog}>verify email</Button>
                                </div>
                            }
                        </Popup>
                    </div>
                </Col>
            )
        }
        if(this.props.formInfo.isTextEnabled){
            channelComps.push(
                <Col md="4">
                    <div className="c-input-icon" >
                        <MaskedTextBox mask="(999) 000-00-00-00" label="Text/SMS" name='phone' id='phone' style={{width: '100%'}} defaultValue={this.state.phoneChannel.phoneNumber}/>
                        <span className="icon"
                            ref={(icon) =>{this.smsVerifyIcon = icon}}
                            onClick={()=>{this.setState({channelPopUpStatus: [this.state.channelPopUpStatus[0], !this.state.channelPopUpStatus[1]]})}}>
                            {this.state.phoneChannel.isNumberVerified ? 
                                <i class='k-icon k-i-check c-i-success'></i> :
                                <i class='k-icon k-i-cancel c-i-warning'></i>
                            }
                        </span>
                        <Popup
                            anchor={this.smsVerifyIcon}
                            show={this.state.channelPopUpStatus[1]}
                            popupClass={'popup-content'}
                        >
                            {!this.state.phoneChannel.isNumberVerified && 
                                <div style={{textAlign: 'center'}}>
                                    <Button className="btn_info" onClick={this.toggleDialog}>verify Phone Number</Button>
                                </div>
                            }
                        </Popup>
                    </div>
                </Col>
            )
        }
        if(this.props.formInfo.isMobileAppEnabled){
            channelComps.push(
                <Col md="4" style={{textAlign: 'center'}}>
                    <label className="k-form-field mb-2 mt-3">
                        <input type="checkbox" className="k-checkbox" id="mobile" name="mobile" checked={this.props.formInfo.isMobileAppEnabled}/>
                        <label className="k-checkbox-label" for="mobile">Mobile App</label>
                    </label>
                </Col>
            )
        }   
        return (<Row>{channelComps}</Row> )
    }

    actionButton(flag){
        const { isShowActions } = this.state;
        if(!isShowActions) return null;

        let _btn = null;
        switch (flag){
            case 'edit':
                _btn = <Button className="btn_primary c-action-btn"><i class='k-icon k-i-edit'></i></Button>;
                break;
            case 'save':
                _btn = <Button className="btn_success c-action-btn"><i class='k-icon k-i-save'></i></Button>;
                break;
            case 'cancel':
                _btn = <Button className="btn_danger c-action-btn"><i class='k-icon k-i-close'></i></Button>;
                break;
            default:
                break;
        }
            
        return _btn;
    }
    actionButtons(){
        return (
            <ul>
                {/* <li>
                    <Animation
                        transitionName="custom-animation"
                        transitionEnterDuration={440}
                        transitionExitDuration={200}
                        style={{padding: '0px 0px 2px 0px'}}
                        >
                            {this.actionButton('cancel')}
                    </Animation>
                </li> */}
                <li>
                    <Animation
                        transitionName="custom-animation"
                        transitionEnterDuration={320}
                        transitionExitDuration={320}
                        style={{padding: '0px 0px 2px 0px'}}
                        >
                            {this.actionButton('cancel')}
                    </Animation></li>
                <li>
                    <Animation
                        transitionName="custom-animation"
                        transitionEnterDuration={200}
                        transitionExitDuration={440}
                        style={{padding: '0px 0px 2px 0px'}}
                        >
                            {this.actionButton('save')}
                    </Animation></li>
            </ul>      
        )
    }
    changedFormData = (e) =>{
        let _ele = e.target;
        if(_ele.props){
            this.state.formDataChanges[_ele.props.id] = _ele.value;
        }else{
            if(_ele.type == 'checkbox') this.state.formDataChanges[_ele.id] = _ele.checked;
            else this.state.formDataChanges[_ele.id] = _ele.value;
        }
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.setRequestFormInfo('formID').then(res=>{
            if(res.response) window.alert("Successfully submitted.")
            else window.alert("submition failed.")
        });
    }
    render() {
        return (
            <div>
                <div className="d-flex justify-content-end" style={{padding: '16px 24px'}} >
                    <Button className="btn_success mb-2" style={{width: '158px'}} onClick={()=>this.submitBtnRef.click()}>Send Request</Button>
                    <Button className="btn_muted mb-2" style={{width: '158px'}}>Cancel</Button>
                </div>
                
                <Card style={{padding: '16px 24px'}}>
                    <div className="text-center" style={{fontSize: '28px', fontWeight: 'bold', margin: '24px 0px'}}>{this.props.formInfo.formTitle}</div>
                    
                    <div className="c-frame request-form mb-5">
                        <div className="c-frame-header">BASIC INFORMATION</div>
                        <form className="k-form" onSubmit={this.handleSubmit}>
                            <BasicInfomation {...this.props} onChangeFormData={this.changedFormData}/>
                            <button type="submit" ref={ele => this.submitBtnRef = ele} hidden>Submit</button>
                        </form>
                    </div>

                    <div className="c-frame document mb-4">
                        <div className="c-frame-header">DOCUMENT</div>
                        <DocumentGroupList {...this.props}/>
                    </div>

                    <div className="mb-4 pl-4 pr-4">
                        {this.createChannels()}
                    </div>
                    <div className="mb-4">
                        <p style={{fontSize: '22px', color: '#9c9c9c', marginLeft: '20px'}}>COMMENT</p>
                        
                        <Editor style={{width: '100%'}}
                            tools={[
                                [ Bold, Italic, Underline ],
                                [ Undo, Redo ],
                                [ Link, Unlink ],
                                [ AlignLeft, AlignCenter, AlignRight ],
                                [ OrderedList, UnorderedList, Indent, Outdent ]
                            ]}
                            contentStyle={{ height: 180 }}
                            
                        />
                    </div>
                  6022741114 107082
                </Card>

                <div className={`c-stacked-btn-group ${this.state.btnGroupStatus ? 'active' : ''}`} 
                    onMouseEnter={() => {this.setState({isShowActions: true})}}
                    onMouseLeave={() => {this.setState({isShowActions: false})}}>
                    {this.actionButtons()}
                    <Button className="c-fixed-action-btn btn_warning"><i class='k-icon k-i-menu'></i></Button>
                    
                </div>

                {this.state.visible && <Dialog title={"VERIFICATION"} onClose={this.toggleDialog}>
                    <p className="text-center ml-4">please try to verify Email or Phone</p>
                    <DialogActionsBar>
                        <Button className="fn-success" onClick={this.toggleDialog}>OK</Button>
                        <Button className="fn-danger" onClick={this.toggleDialog}>CANCEL</Button>
                    </DialogActionsBar>
                </Dialog>}
            </div>
        );
    };
}

// export default NewRequest;
const mapStateToProps = state => {
    return {
        formInfo: state.requestFormInfo
    }
}
export default withRouter(connect(mapStateToProps, { getRequestFormInfo, setRequestFormInfo })(NewRequest));
