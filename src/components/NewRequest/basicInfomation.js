import React from 'react';
import {Row, Col} from 'reactstrap';
import { NumericTextBox, MaskedTextBox, Input, Switch, Slider } from '@progress/kendo-react-inputs';
import { DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';

function appendField(array, field, x, y){
    if(!array[x]) array[x] = [];
    array[x][y] = field;
}
function createCheckbox(data, callback){
    return (<label className="k-form-field col-md-4 align-items-center d-flex mb-2" key={data.formFieldCode}>
        <input
            type="checkbox"
            className="k-checkbox"
            id={data.formFieldId}
            name={data.formFieldCode}
            onChange={(event)=>callback(event)}/>
        <label className="k-checkbox-label" for={data.formFieldId}>{data.formFieldDisplayName}</label>
    </label>)
}
function createTextField(data, callback){
    return ( <div className="col-md-4 mb-2">
        <p>{data.formFieldDisplayName}</p>
        <Input
            label={data.defaultValueInsideTextBox}
            id={data.formFieldId}
            name={data.formFieldCode}
            required={data.isRequired}
            defaultValue={data.formFieldValue}
            onChange={(event)=>callback(event)}
            style={{width: '100%', minWidth: '128px'}}/>
    </div>)
}
function createMultiSelectField(data, callback){
    return ( <div className="col-md-4 mb-2">
        <p>{data.formFieldDisplayName}</p>
        <MultiSelect
            data={Object.values(data.possibleValues)}
            defaultValue={[]}
            onChange={(event)=>callback(event)}/>
    </div>)
}
function createSignleSelectField(data, callback){
    return (<div className="col-md-4 mb-2">
        <DropDownList
            label={data.formFieldDisplayName}
            id={data.formFieldId}
            name={data.formFieldCode}
            data={Object.values(data.possibleValues)}
            defaultValue={data.possibleValues[data.defaultSelectedCode]}
            onChange={(event)=>callback(event)}
            style={{width: '100%', minWidth: '128px'}}/>
    </div>)
}
function createRadioField(data, callback){
    return (<div className="col-md-4 d-flex align-items-center mb-2">
        <input
            type="radio"
            id={data.formFieldId}
            name={data.formFieldCode}
            onChange={(event)=>callback(event)}
            className="k-radio"
            checked="checked" />
        <label className="k-radio-label" for={data.formFieldId}>{data.formFieldDisplayName}</label>
    </div>)
}
function createTextareaField(data, callback){
    return (<div className="col-md-4 mb-2">
        <textarea
            className="k-textarea"
            onChange={(event)=>callback(event)}>
                this is text area
        </textarea>
    </div>)
}

const BasicInfomation = (props) => {
    let elements = [];

    let textFieldList = props.formInfo.rmiFormTextieldList
    if(textFieldList && textFieldList.length) textFieldList.map(item => {
        let field = createTextField(item, props.onChangeFormData);
        appendField(elements, field, item.rowLocation, item.columnLocation);
    });

    let checkBoxList = props.formInfo.rmiFormCheckboxFieldList
    if(checkBoxList && checkBoxList.length) checkBoxList.map(item => {
        let field = createCheckbox(item, props.onChangeFormData);
        appendField(elements, field, item.rowLocation, item.columnLocation);
    });

    let multiSelectFieldList = props.formInfo.rmiFormMultiSelectFieldList
    if(multiSelectFieldList && multiSelectFieldList.length) multiSelectFieldList.map(item => {
        let field = createMultiSelectField(item, props.onChangeFormData);
        appendField(elements, field, item.rowLocation, item.columnLocation);
    });

    let singleSelectFieldList = props.formInfo.rmiFormSingleSelectFieldList
    if(singleSelectFieldList && singleSelectFieldList.length) singleSelectFieldList.map(item => {
        let field = createSignleSelectField(item, props.onChangeFormData);
        appendField(elements, field, item.rowLocation, item.columnLocation);
    });

    let radioFieldList = props.formInfo.rmiFormRadioFieldList
    if(radioFieldList && radioFieldList.length) radioFieldList.map(item => {
        let field = createRadioField(item, props.onChangeFormData);
        appendField(elements, field, item.rowLocation, item.columnLocation);
    });

    let textareaFieldList = props.formInfo.rmiFormTextAreaFieldList
    if(textareaFieldList && textareaFieldList.length) textareaFieldList.map(item => {
        let field = createTextareaField(item, props.onChangeFormData);
        appendField(elements, field, item.rowLocation, item.columnLocation);
    });

    let formData = [];
    for(let i = 1; i < elements.length; i++){
        let row = elements[i]
        formData.push(<Row style={{marginBottom: '30px'}} ref={(aa)=>props.formRef.current = aa}>{row}</Row>)            
    }
    return formData;
}

export default BasicInfomation;