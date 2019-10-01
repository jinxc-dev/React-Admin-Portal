import React from 'react';
import {Row, Col} from 'reactstrap';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';

let docCellRender = (cell, props) => {
        
    if (props.field === "field1") {
        if (props.dataItem[props.field]) {
            return (
            <td className="custom-cell" rowSpan={2}>
                {props.dataItem[props.field].toString()}
            </td>
            )
        } else {
            return null
        }
    }

    return (
      cell
    )
  }
function createDocGrup(data){
    let _isDocGroup = data.formInfo.isDocumentGroupApplicable;
    let _eles = [];
    if(_isDocGroup){
        let groupList = data.formInfo.rmiDocumentGroupList;
        let groupNames = [];
        groupList.map(group =>{ groupNames.push(group.groupDisplayName) });

        _eles.push(<div className="col-lg-4 mb-4">
            <DropDownList data={groupNames} defaultValue={groupNames[0]} />
        </div>)
    }

    return _eles;
}
function createDocContent(data){
    let gridData = [
        {field1: 'Required', field2: 'BBB1', field3: 'CCC1'},
        {field1: false, field2: 'BBB2', field3: 'CCC2'},
        {field1: 'Optional', field2: 'DDD1', field3: 'EEE1'},
        {field1: false, field2: 'DDD2', field3: 'EEE2'}
    ]

    return (
        <Col lg="8">
            <Grid
                // style={{ height: '700px' }}
                sortable
                filterable
                reorderable

                data={gridData}
                // onDataStateChange={this.dataStateChange}
                cellRender={docCellRender}
                >
                <Column field="field1" filterable={false} title="Option"/>
                <Column className="custom-cell column_2" field="field2" title="Document Name"/>
                <Column className="custom-cell" field="field3" title="Description"/>
                {/* <Column  field="Actions" width="120px" filterable={false}
                    cell={(props) => (
                        <td className="custom-cell">
                            <input type="checkbox" checked={false} />
                        </td>
                    )} /> */}
            </Grid>
        </Col>
    )

    let _docGroupList = data.formInfo.rmiDocumentGroupList;
    let _unitNameList = [];
    if(_docGroupList && _docGroupList.length){
        let _subUnitList = _docGroupList[0].businessSubUnitList;
        _subUnitList.map(unit=>{
            _unitNameList.push(<li>{unit}</li>)
        })
    

        return (<div className="col-lg-8">
                    <p>Business SubUnits</p>
                    <ul>
                        {_unitNameList}
                        <li>Dummy Group 1</li>
                        <li>Dummy Group 2</li>
                        <li>Dummy Group 3</li>
                    </ul>
                    <p>Required</p>
                    <p>- {_docGroupList[0].rmiDocuments.REQUIRED.displayName}</p>
            </div>)
    }
}

const DocumentGroupList = (props) => {
    return (
        <Row>
            {createDocGrup(props)}
            {createDocContent(props)}
        </Row>
    );
}

export default DocumentGroupList;
